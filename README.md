curl -X POST  https://or-dev-prod.k3l.io -H "Content-Type: application/json" -d '{
  "jsonrpc": "2.0",
  "method": "sequencer_get_results",
  "params": [{
    "request_tx_hash": "35b8f06856b66b27b746c33fb8d779e23bc62715baf23d88c5ac31527d43d4d5",
    "start": 0,
    "size": 10
  }],
  "id": 1
}'

curl -X POST https://or-dev-prod.k3l.io -H "Content-Type: application/json" -d '{
  "jsonrpc": "2.0",
  "method": "sequencer_get_tx",
  "params": ["compute_request", "35b8f06856b66b27b746c33fb8d779e23bc62715baf23d88c5ac31527d43d4d5"],
  "id": 1
}'

curl -X POST https://or-dev-prod.k3l.io -H "Content-Type: application/json" -d '{
  "jsonrpc": "2.0",
  "method": "sequencer_get_tx",
  "params": ["compute_verification", "c409330d99f81bd643f50165615deb4944f72b07e84dda2c7615359b099326a9"],
  "id": 1
}'

curl -X POST https://or-dev-prod.k3l.io -H "Content-Type: application/json" -d '{
  "jsonrpc": "2.0",
  "method": "sequencer_get_tx",
  "params": ["compute_assignment", "0f34d504d587af8ed7141e59f1141ca09b5c1b146b3a1a96f25986b7239154c0"],
  "id": 1
}'


assignment tx?

curl -X POST https://or-dev-prod.k3l.io  -H "Content-Type: application/json" -d '{
  "jsonrpc": "2.0",
  "method": "sequencer_get_compute_result",
  "params": [0],
  "id": 1
}'