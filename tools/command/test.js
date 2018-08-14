const PipeTasks = require("../common/PipeTasks");
process.env.NODE_ENV = "production";
PipeTasks(
    [
        {
            command: "test:server",
            main: true
        },
        {
            command: "test:electron",
            main: true,
            interval: 1000
        }
    ]
).execute();
