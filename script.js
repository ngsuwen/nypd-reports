const getData = (cityName, num) => {
    $.ajax({
        url: `https://data.cityofnewyork.us/resource/erm2-nwe9.json?borough=${cityName}&agency=NYPD`,  //?borough=XXX to filter XXX
        type: "GET",
        data: {
            "$limit": num,
            "$$app_token": "GSoQGa1kCVnaJ0eW9YWipaiwq"   //not necessary, but can help to narrow down the data
        }
    }).done(function(data) {
        const $container=$('.container')
        for (let i=0;i<num;i++){
            const $div=$('<div>').attr('id',`div1-${i}`).append(data[i].descriptor)
            const $button=$('<button>').attr('id',`but-${i}`).text('Resolution')
            $button.css('float','right')
            const $div2=$('<div>').attr('id',`div2-${i}`).text(data[i].resolution_description).hide()
            $button.on('click', ()=>{resolution(i)})
            $div.append($button)
            $div.append($div2)
            $container.append($div)
        }
    })
}

const resolution=(i)=>{
    $(`#div2-${i}`).toggle()
}

const cityName = ['BROOKLYN','MANHATTAN','QUEENS','BRONX','STATEN-ISLAND']

$(() => {
    for (let i of cityName){
        $("form").on("click", `#${i}`, (event) => {
            event.preventDefault();
            if ($('#input-box').val() == '') {
                var input = 10
            } else {
                var input = $('#input-box').val()
                console.log(`https://data.cityofnewyork.us/resource/erm2-nwe9.json?borough=${i}&agency=NYPD`)
            }
            $('.container').empty()
            getData($(`#${i}`).val(), input)
        });
    }
})
