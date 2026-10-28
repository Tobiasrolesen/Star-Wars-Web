const list = document.getElementById("character-list");
const form = document.getElementById("character-form");
const message = document.getElementById("message");

async function loadCharacters() {
    try {
        //Fetch bruges på characters for hente characters, GET er standard request hvis man ikke angiver andet.
        const response = await fetch("/characters");

        //Laver characters (tekst) om til et javascript array
        const characters = await response.json();

        list.innerHTML = "";

        //Hver plads i arrayed kalder vi appendChild på og fylder dermed html elementerne ud med JSON
        for (const character of characters) {
            const item = document.createElement("li");
            item.textContent = `${character.name} - ${character.role} - ${character.planet}`;
            list.appendChild(item);
        }
    } catch (err) {
        message.textContent = "Kunne ikke hente karakterer fra serveren";
        message.className = "error";
    }
}

//Kører funktionen når der trykkes opret (vi kalder submit)
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    //Opretter newCharacter, .value er den værdi brugeren skriver på webben.
    const newCharacter = {
        name: document.getElementById("name").value,
        role: document.getElementById("role").value,
        planet: document.getElementById("planet").value
    };

    try {
        //Fetch bruges igen på character her, denne gang en POST
        const response = await fetch("/characters", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCharacter)
        });

        const data = await response.json();

        if (!response.ok) {
            message.textContent = data.error;
            message.className = "error";
            return;
        }

        message.textContent = `${data.name} er oprettet`;
        message.className = "success";

        //Ved success nulstilles formen og listen hentes igen.
        form.reset();
        await loadCharacters();
    } catch (err) {
        message.textContent = "Kunne ikke kontakte serveren";
        message.className = "error";
    }
});

loadCharacters();
