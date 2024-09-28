curl -X POST https://radon.nauka.gov.pl/opendata/portal-search \
-H "Content-Type: application/json" \
-d '{"offset":9999,"size":2000,"objectTypes":["REPORTS_COURSE"],"sorting":{"sortOrder":"ASC","fieldName":"name"},"filter":{}}'