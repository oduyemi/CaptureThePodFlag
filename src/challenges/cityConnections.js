const validateCityConnections = (input) => {
    const challengeData = require("./cityConnections.json").data;
    const { graph, start, end } = challengeData;

    try {
        const path = JSON.parse(input);
        for (let i = 0; i < path.length - 1; i++) {
            const currentCity = path[i];
            const nextCity = path[i + 1];

            if (!graph[currentCity] || !graph[currentCity].includes(nextCity)) {
                return "Incorrect submission: invalid path.";
            }
        }

        if (path[0] === start && path[path.length - 1] === end) {
            return "FLAG{city_path_found}";
        } else {
            return "Incorrect submission: start or end point invalid.";
        }
    } catch {
        return "Incorrect submission: invalid format.";
    }
};

module.exports = validateCityConnections;
