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
        let start = new Date().getTime()
        while (new Date().getTime() < start + ms);
    }

    , removeElemFromArray: (array, elem) => {
        for (let i = 0; i < array.length; i++) {
            if (array[i] == elem) {
                array.splice(i, 1)
            }
        }
    }

    , getUrlFromImgAbsUrl: (absUrl) => {
        const imgUrl = absUrl.split("\"")
        return imgUrl[1]
    }

    , buildDateTime: (datetime) => {
        const buildedDatetime = datetime.toISOString()
        return buildedDatetime
    }

    , parseDatetime: (datetime) => {
        const parsedDatetime = new Date(datetime)
        return parsedDatetime
    }
}

export default Utils;