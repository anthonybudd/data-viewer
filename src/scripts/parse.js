const readline = require('readline');
const fs = require('fs');

(async function () {
    const fileStream = fs.createReadStream('data.txt');
    const out = [];

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const json of rl) {
        try {
            const { data, rssi } = JSON.parse(json);
            d = data.split('|');

            if (d.length !== 4) continue;
            // if (!d[0].incudes('UTC:')) continue;
            // if (!d[1].incudes('LNG:')) continue;
            // if (!d[2].incudes('LAT:')) continue;
            // if (!d[3].incudes('satellites:')) continue;

            const time = d[0].replace('UTC:', '');
            const lon = d[1].replace('LNG:', '');
            const lat = d[2].replace('LAT:', '');
            const satellites = d[3].replace('satellites:', '');

            if (!lon || !lat) continue;
            if (isNaN(Number(lon)) || isNaN(Number(lat))) continue;

            out.push({
                time,
                lon,
                lat,
                satellites,
                rssi,
                // rssi: Math.abs(rssi)
            });
        } catch (error) { }
    }

    fs.writeFileSync('./src/data/data.json', JSON.stringify(out));
    console.log(`Found ${out.length} events`);
    console.log("Saved to ./src/data/data.json \n");
})();
