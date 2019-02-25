//usage node <this-file-name> <aws-json-file-name> <output-file-name>

const _ = require("lodash")
const fs = require('fs')

const input_aws_json_file_name = _.get(process.argv, "[2]")
const output_env_file_name = _.get(process.argv, "[3]")

let prefix = "declare -x "
let data_to_write = "\n"
fs.readFile(input_aws_json_file_name, (err, data) => {
    _.forEach(JSON.parse(data), (env) => {
        console.log("writing for...", env.name, env.value)
        data_to_write += prefix + env.name + '="' + env.value + '"' + "\n"
    })
    fs.writeFile(output_env_file_name, data_to_write, (err) => {
        if (err) throw err;
        console.log("File done..")
    })
})
