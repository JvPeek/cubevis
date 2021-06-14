client = new Paho.MQTT.Client("192.168.2.11", 9001, Math.random().toString(36).substr(2, 9));
//client = new Paho.MQTT.Client("localhost", 9001, Math.random().toString(36).substr(2, 9));
client.onMessageArrived = onMessageArrived;
client.onConnectionLost = onConnectionLost;
client.connect({onSuccess:onConnect});


function onMessageArrived(message) {
  console.log(message);
  setPositions(message.payloadString)
}

function onConnect() {
  client.subscribe("rubiks/faces");
}
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}
