console.log('Client side JS file loaded');
const url1 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Chicago.json?access_token=pk.eyJ1IjoicGFuZGFzaWJhNzg2IiwiYSI6ImNrMzVidmV4MDBoY3czaHBlZnFjZWNkMWYifQ.eGSHTw0nj1O2hyjfFAmyoA'
const url2 = 'http://puzzle.mead.io/puzzle';
// fetch(url3).then(data => {
//     data.json().then(data => {
//         if(data.error){
//             // console.log('>>>>>Error>>>>', data.error);
//         } else {
//             // console.log('>>>>>Data>>>>', data);
//         }
//     })
// })
const weatherForm = document.querySelector('form');
const search = document.querySelector('input')
const errMsgTobeShown = document.querySelector('#errorMsg')
const succMsgTobeShown = document.querySelector('#successMsg')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchLocation = search.value;
    errMsgTobeShown.textContent = 'Loading...'
    succMsgTobeShown.textContent = ''

    console.log('>>>>>searchLocation>>>>', searchLocation);
    if (!searchLocation) {
        errMsgTobeShown.textContent = 'Address must be provided'
        console.log('Address must be provided');
        return;
    }
    const url3 = '/weather?address=' + searchLocation + ' ';
    fetch(url3).then(response => {
        response.json().then(data => {
            if (data.error) {
                console.log('>>>>>Error>>>>', data.error);
                errMsgTobeShown.textContent = data.error
            } else {
                console.log('>>>>>Data>>>>', data);
                succMsgTobeShown.textContent = data.forecast
                errMsgTobeShown.textContent = data.location
                // errMsgTobeShown.textContent = ''
            }
        })
    })
})