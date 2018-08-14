const PipeTasks = require("../common/PipeTasks");
process.env.NODE_ENV = "production";
PipeTasks(
    [
        {
            command: "test:server",
            main: true
        },
        {
            command: "testd:electron",
            main: true,
            interval: 2000
        }
    ]
).execute();
