# Meenta CLI
Meenta Command Line Interface (Upload, Download, Manage Samples).

This is the recommended methods for users and hosts to exchange
sample/project data. The Meenta cloud provides a secure service
for data storage.

### Installation
Use the following to install the `meenta-cli` on your machine. Remember
to use the `-g` to install this as a global npm package.

    npm install -g https://github.com/Meenta/meenta-cli/tarball/master

    % meenta --help

### Getting Started
To use the command line, we currently only allow Key/Secret
access. To get started you need an active Meenta.io account
and have the API enabled. You need to generate your account
`key` and `secret`.

    % meenta login <key> <secret>

### Requirements
The cli requires `node.js` and `npm` installed.

### Sample File Upload
When you (as host) are ready to upload your data from Meenta, use
the following command.

    // Use this to download a specific sample file.
    % meenta sample upload <sampleId> <file>

### Sample Data Download
When you are ready to download your data from Meenta, use
the following command.

    // Use this to list all the files for the current sample project.
    % meenta sample data <sampleId>

    // Use this to download a specific sample file.
    % meenta sample download <sampleId>

### Features
The following are features on the Meenta API.

- Login - Sign into your account using your API key.
- Samples - Commands for accessing samples.
- Instruments - Commands for accessing samples.
