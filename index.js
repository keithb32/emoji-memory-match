const EMOJIS = getEmojis();

// $(".flipcard").on("click", ({currentTarget}) => {
//     $(currentTarget).toggleClass("is-flipped");
// })

$("#dimensions").on("input", ({currentTarget}) => {
    let dimensions = $(currentTarget).val();

    if (dimensions > 5){
        $(currentTarget).val(5);
        dimensions = 5;
    }

    $("#placeholderTable").empty();
    for (let i = 0; i < dimensions; i++){
        let row = $("<tr>").appendTo("#placeholderTable")
        for (let j = 0; j < dimensions; j++){
            row.append(`
                <td class="flipcard-container"> 
                    <div class="flipcard">
                        <div class="card-face card-front">❔</div>
                        <div class="card-face card-back"></div>
                    </div>
                </td>
          `)
        }
        row.append("</tr>");
    }
})

$("#startGameForm").on("submit", () => {
    let dim = $("#dimensions").val();
    dim *= dim;
    $("#startGameContainer").empty();
    alert(getRandomEmojis(dim));    
})

// ------ HELPER METHODS ------- //
function getEmojis(){
    let emojis = []

    for (let i = 0x1F600; i <= 0x1F64F; i++) {
        emojis.push(String.fromCodePoint(i));
    }
    
    for (let i = 0x1F300; i <= 0x1F5FF; i++) {
        emojis.push(String.fromCodePoint(i));
    }
    
    for (let i = 0x1F680; i <= 0x1F6FF; i++) {
        emojis.push(String.fromCodePoint(i));
    }
    
    for (let i = 0x2600; i <= 0x26FF; i++) {
        emojis.push(String.fromCodePoint(i));
    }

    return emojis;
}

function getRandomEmojis(numEmojis){
    const randomIndices = [];

    while (randomIndices.length < numEmojis){
        const randomIndex = Math.floor(Math.random() * EMOJIS.length);

        // Avoid duplicates
        if (!randomIndices.includes(randomIndex)) {
          randomIndices.push(randomIndex);
        }
    }

    // Create the subset based on the randomly generated indices
    const randomEmojis = randomIndices.map(index => EMOJIS[index]);
    return randomEmojis;
}