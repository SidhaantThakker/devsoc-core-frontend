const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'

export const getUrl = (image) => {
    if(!image){
        return "/no_image_found.jpg"
    }

    if(image.url.indexOf("/") === 0){
        return `${url}${image.url}`
    }

    return image.url
}