from flask import Flask, render_template, request, url_for, jsonify, redirect, make_response, current_app
import json
import sys
import datetime
import shutil
import re
import time
import threading
from datetime import timedelta
from functools import update_wrapper



try:
    unicode = unicode
except NameError:
    # 'unicode' is undefined, must be Python 3
    str = str
    unicode = str
    bytes = bytes
    basestring = (str,bytes)
else:
    # 'unicode' exists, must be Python 2
    str = str
    unicode = unicode
    bytes = str
    basestring = basestring




def crossdomain(origin=None, methods=None, headers=None,
                max_age=21600, attach_to_all=True,
                automatic_options=True):
    if methods is not None:
        methods = ', '.join(sorted(x.upper() for x in methods))
    if headers is not None and not isinstance(headers, basestring):
        headers = ', '.join(x.upper() for x in headers)
    if not isinstance(origin, basestring):
        origin = ', '.join(origin)
    if isinstance(max_age, timedelta):
        max_age = max_age.total_seconds()

    def get_methods():
        if methods is not None:
            return methods

        options_resp = current_app.make_default_options_response()
        return options_resp.headers['allow']

    def decorator(f):
        def wrapped_function(*args, **kwargs):
            if automatic_options and request.method == 'OPTIONS':
                resp = current_app.make_default_options_response()
            else:
                resp = make_response(f(*args, **kwargs))
            if not attach_to_all and request.method != 'OPTIONS':
                return resp

            h = resp.headers
            h['Access-Control-Allow-Origin'] = origin
            h['Access-Control-Allow-Methods'] = get_methods()
            h['Access-Control-Max-Age'] = str(max_age)
            h['Access-Control-Allow-Credentials'] = 'true'
            h['Access-Control-Allow-Headers'] = \
                "Origin, X-Requested-With, Content-Type, Accept, Authorization"
            if headers is not None:
                h['Access-Control-Allow-Headers'] = headers
            return resp

        f.provide_automatic_options = False
        return update_wrapper(wrapped_function, f)
    return decorator
speed = {}
def du(path):
    usage = shutil.disk_usage(path)
    total = usage[0] / 1024 ** 3
    used = usage[1] / 1024 ** 3
    free = usage[2] / 1024 ** 3
    return {'total': str(total)[0:4], 'used':str(used)[0:4], 'free':str(free)[0:4], 'unit':"GiB"}

app = Flask(__name__)


@crossdomain(origin='*')
@app.route('/speeds')
def get_speeds():
    global speed
    return jsonify(speed)

@app.route('/')
def index():
    return render_template('index.html', du = du('/'))

# A regular expression which separates the interesting fields and saves them in named groups
regexp = r"""
  \s*                     # a interface line  starts with none, one or more whitespaces
  (?P<interface>\w+):\s+  # the name of the interface followed by a colon and spaces
  (?P<rx_bytes>\d+)\s+    # the number of received bytes and one or more whitespaces
  (?P<rx_packets>\d+)\s+  # the number of received packets and one or more whitespaces
  (?P<rx_errors>\d+)\s+   # the number of receive errors and one or more whitespaces
  (?P<rx_drop>\d+)\s+      # the number of dropped rx packets and ...
  (?P<rx_fifo>\d+)\s+      # rx fifo
  (?P<rx_frame>\d+)\s+     # rx frame
  (?P<rx_compr>\d+)\s+     # rx compressed
  (?P<rx_multicast>\d+)\s+ # rx multicast
  (?P<tx_bytes>\d+)\s+    # the number of transmitted bytes and one or more whitespaces
  (?P<tx_packets>\d+)\s+  # the number of transmitted packets and one or more whitespaces
  (?P<tx_errors>\d+)\s+   # the number of transmit errors and one or more whitespaces
  (?P<tx_drop>\d+)\s+      # the number of dropped tx packets and ...
  (?P<tx_fifo>\d+)\s+      # tx fifo
  (?P<tx_frame>\d+)\s+     # tx frame
  (?P<tx_compr>\d+)\s+     # tx compressed
  (?P<tx_multicast>\d+)\s* # tx multicast
"""



pattern = re.compile(regexp, re.VERBOSE)


def get_bytes(interface_name):
    '''returns tuple of (rx_bytes, tx_bytes) '''
    with open('/proc/net/dev', 'r') as f:
        a = f.readline()
        while(a):
            m = pattern.search(a)
            # the regexp matched
            # look for the needed interface and return the rx_bytes and tx_bytes
            if m:
                if m.group('interface') == interface_name:
                    return (m.group('rx_bytes'),m.group('tx_bytes'))
            a = f.readline()


def loop():
    global speed
    while True:
        last_time  = time.time()
        last_bytes = get_bytes('wlp2s0:')
        time.sleep(0.5)
        now_bytes = get_bytes('wlp2s0:')
        up = (int(now_bytes[1]) - int(last_bytes[1]))
        down = (int(now_bytes[0]) - int(last_bytes[0]))
        speed = {'up': up, 'down': down}
t1 = threading.Thread(target=loop)
t1.start()





if __name__ == '__main__':
    app.config['DEBUG'] = True
    app.debug = True
    app.run(host="0.0.0.0")
