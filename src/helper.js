function getIdFromUrl(url) {

    const matches = url.match(/product\/([0-9a-zA-Z]{1,})/)
    const id = matches[1]
    return id
}

function getIdAndQtyFromUrl(url) {
    
    const id = url.split('=')[1].split('/')[0]
    const qty = parseInt(url.split("=")[2])
    
    return [id, qty]
}

function getFilterFromUrl(filter) {

    const condition = filter.split('=')[1]

    return condition
}

export {getIdFromUrl, getIdAndQtyFromUrl, getFilterFromUrl}