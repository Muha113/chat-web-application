export function parseForm(form) {
    const values = {};
    new FormData(form).forEach((value, key) => {
            values[key] = value;
        }
    );
    return values;
}