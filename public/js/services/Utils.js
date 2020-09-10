const Utils = {
    parseRequestURL : () => {

        let url = window.location.pathname;
        let r = url.split("/")
        let request = {
            resource    : null,
            id          : null,
            verb        : null
        }
        request.resource    = r[1]
        request.id          = r[2]
        request.verb        = r[3]

        return request
    }

    , sleep: (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    , removeElemFromArray: (array, elem) => {
        for (let i = 0; i < array.length; i++) {
            if (array[i] == elem) {
                array.splice(i, 1)
            }
        }
    }
}

export default Utils;