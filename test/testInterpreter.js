const mqtt = require("mqtt")
const client = mqtt.connect("mqtt://localhost:1883/")

client.on("connect", e => {
    client.subscribe("/dentistimo/authenticated/test", {qos:1},e => {
        client.on("message", (topic, m, option) => {
            try {
                let message = JSON.parse(m.toString())
                if (message.request === 'test' && message.data === 'hello') {
                    let response = { "id": message.id, "response": "response", "data": message.data}
                    client.publish(topic, JSON.stringify(response), {qos:1})
                }
            }
            catch (e) {
            console.log(e)
            }
        })
    })
})
