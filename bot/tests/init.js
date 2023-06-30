const AdvancedClient = require("../src/structure/Client");

module.exports = {
  /**
   * @param {AdvancedClient} client 
   */
  test: (client) => {
    console.log("test");
  },
  name: "test",
  when: "init_end",
  enabled: false
}