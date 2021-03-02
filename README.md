# jest-sonar-reporter

jest-sonar-reporter is a custom results processor for Jest.
The processor converts Jest's output into Sonar's
[generic test data](https://docs.sonarqube.org/display/SONAR/Generic+Test+Data) format.

This is fork from [3dmind jest-sonar-reporter](https://github.com/3dmind/jest-sonar-reporter) with some small fixes.

### What was changed?
1. Fixed error with strange characters (for example `expect([107mrec)`) - SQ does not work with these characters.
2. Previously in report file the path to checked file was like `"/usr/src/app/src/modules/<path>"` so I change file path to `"src/modules/<path>"`
3. Fixed error with recursive creating folder (if your directory for reports is like `<root>/folder/anotherFolder/reports`) 

## Installation

Using npm:

```bash
$ npm i -D pruchay/jest-sonar-reporter
```

Using yarn:

```bash
$ yarn add -D pruchay/jest-sonar-reporter
```

## Configuration

Configure Jest in your `package.json` to use `jest-sonar-reporter` as a custom results processor.

```json
{
  "jest": {
    "testResultsProcessor": "jest-sonar-reporter"
  }
}
```

> Looks like Jest try to run coverage report even if I don't ask him ([more in this issue](https://github.com/facebook/jest/issues/10851)).

Configure Sonar to import the test results. Add the `sonar.testExecutionReportPaths` property to your
`sonar-project.properties` file.

```properties
sonar.javascript.lcov.reportPaths=coverage/lcov.info
sonar.testExecutionReportPaths=coverage/test-report.xml
```

## Customization

To customize the reporter you can use `package.json` to store the configuration.

Create a `jestSonar` entry like this:

```json
{
  "jestSonar": {}
}
```

You can customize the following options:
- `reportPath` This will specify the path to put the report in.
- `reportFile` This will specify the file name of the report.
- `indent` This will specify the indentation to format the report.

```json
{
  "jestSonar": {
    "reportPath": "reports",
    "reportFile": "test-reporter.xml",
    "indent": 4
  }
}
```

> Important: Don't forget to update `sonar.testExecutionReportPaths` when you use a custom path and file name.

### Support for Sonarqube 5.6.x

Sonarqube 5.6.x does not support [Generic Test Data](https://docs.sonarqube.org/display/SONAR/Generic+Test+Data) however it has a [Generic Test Coverage plugin](https://docs.sonarqube.org/display/PLUG/Generic+Test+Coverage) which offers similar functionality.

If you have the plugin installed on Sonarqube, you can configure this reporter to produce files in supported format.

```json
{
  "jestSonar": {
    "sonar56x": true
  }
}
```

Configure Sonar to import the test results. Add the `sonar.genericcoverage.unitTestReportPaths` property to your
`sonar-project.properties` file.

```properties
sonar.genericcoverage.unitTestReportPaths=test-report.xml
```

### Support for different configuration environments

To support different environments add the `env` property to the configuration and overwrite the value of the option you want to modify for the specific environment.
You can overwrite the following configuration options: `reportPath`, `reportFile`, `indent`, `sonar56x`

For example: Overwrite the path were the report will be stored.
```json
{
  "jestSonar": {
    "reportPath": "reports",
    "reportFile": "test-reporter.xml",
    "indent": 4,
    "env": {
      "test": {
        "reportPath": "reports-test"
      }
    }
  }
}
``` 

Use the `NODE_ENV` variable to activate the environment specific configuration.
```shell
NODE_ENV=test npm run test
``` 

## Usage

1. Run Jest to execute your tests with coverage flag (for example `jest --coverage`).

Using npm:

```bash
$ npm run test
```

Using yarn:

```bash
$ yarn run test
```

2. Configure your SQ configuration file

For example:
```properties
# Source
sonar.sources=src
sonar.exclusions=**/__tests__/**/*

# Unit tests
sonar.tests=src
sonar.test.inclusions=**/__tests__/**/*.test.js

# Test Coverage & Execution
sonar.javascript.lcov.reportPaths=coverage/lcov.info
sonar.testExecutionReportPaths=coverage/test-report.xml
```

Read official SQ documentation for more information about how to Configure SQ. 

3. Run sonar-scanner to import the test results.

```bash
$ sonar-scanner
```

## Licence

This project uses the [MIT](LICENSE) licence.
