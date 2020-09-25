set="ZNR"
record="7-0"
curl -sS https://www.17lands.com/data/draft?draft_id=$id > $id.json && jq -s ".[0] * {\"$id\":(.[1] * {\"set\": \"$set\", \"source\": \"17lands.com/trophies\", \"record\": \"$record\", \"type\": \"Premier\"})}" logs.json $id.json > newlogs.json && mv newlogs.json logs.json && rm $id.json
