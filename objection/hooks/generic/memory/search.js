// Searches for a byte pattern in the current process memory.

var ranges = Process.enumerateRangesSync({
    protection: 'rw-', coalesce: true
});

var match_adresses = [];

for (i = 0; i < ranges.length; i++) {

    var range = ranges[i];
    var matches = Memory.scanSync(range.base, range.size, '{{ pattern }}');

    if (matches.length > 0) {

        for (r = 0; r < matches.length; r++) {

            match_adresses.push(matches[r].address.toString());
        }
    }
}

var response = {
    status: 'success',
    error_reason: NaN,
    type: 'memory-search',
    data: match_adresses
}

send(JSON.stringify(response));
