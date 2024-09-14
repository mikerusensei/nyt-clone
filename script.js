const file = "test-json.json";

fetch(file)
    .then(result => result.text())