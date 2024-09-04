"use strict";
const heading_element = document.getElementById('heading'); //laver en heading, relevant på nogle af objecterne
const txt_element = document.getElementById('txt'); //henter de elementer der skal kunne ændres for hver skift
const buttonsContainer = document.getElementById('buttons-container'); //henter knapperne så de kan justeres alt efter om der skal være 2 eller 3

//Array med objecter(som indeholder array)
const steps =[//et array
    {
        id:0,//med et object
        heading:"Pros. VS Cons",
        txt:"En beslutningsrejse",
        options:[ //med et array
            {target: 1, txt:"Regler"},
            {target: 2, txt:"Start"}
        ]
    },
    {
        id:1,
        heading:"Regler",
        txt:"Spillet bygger på princippet “Affordable loss” som omhandler entreprenørskab. I spillet skal du tage de valg som du selv føler passer bedst til dig og dine ideér, du vil undervejs skulle tage valg, som enten koster dig penge eller øger din indkomst. Alt efter hvilke valg du tager, kan du også få en ekstra chance undervejs til at tjene lidt ekstra i form af et terning kast.",
        options:[
            {target:2, txt:"Start spil"}
        ]
    },
    {//spillet/testen starter med dette
        id:2,
        txt:"Du skal til at starte din første virksomhed op. Din start kapital er: 100 $. Du vil blive præsenteret for forskellige scenarier, med to svar valgmuligheder, hvor du træffer valget. ",
        options:[
            {target:3, txt:"Næste"}
        ]
    },
    {//første gren
        id:3, 
        txt:"Du har startet din virksomhed, men inden du kan komme rigtig i gang skal du beslutte dig om du vil arbejde hjemme fra eller leje et lokale.",
        options:[
            {target:4, txt:"Du ønsker at arbejde hjemmefra."},
            {target:5, txt:"Du ønsker at leje dig ind i et kontorfællesskab."}
        ]
    },
    {
        id:4,
        txt:"Du har valgt at starte din virksomhed op derhjemme og har nu fået indrettet dit hjemmekontor. Dertil har du også tilmeldt dig diverse start-up forums, hvor du vil have mulighed for sparing og lignende.",
        options:[
            {target:6, txt:"Næste"}
        ]
    },
    {
        id:5,
        txt:"Du har valgt at leje dig ind i et kontorfællesskab med andre start-up virksomheder og får derved også udvidet dit netværk. Det koster dig -$10",
        options:[
            {target:6, txt:"Næste"}
        ]
    },
    {
        id:6,
        txt:"Du er nu kommet på plads og er klar til at markedsføre din virksomhed, så du kan få nogle kunder!",
        options:[
            {target:7, txt:"Du vælger at hyre en markedsføringskonsulent til at køre kampagnen for din virksomhed."},
            {target:8, txt:"Du vælger selv at lave din markedsføring ved at ringe rundt til diverse virksomheder og tilbyde din service, samt egen digitale kampagner osv. "}
        ]
    },
    {
        id:7,
        txt:"Markedsføringskonsulenten har gjort et rigtig godt job og har fået spredt budskabet om din virksomhed. Du har fået en del kundekontrakter. Markedsføringen har kostet dig -$10.Du indtjener $10",
        options:[
            {target:9, txt:"Næste"}
        ]
    },
    {
        id:8,
        txt:"Du ringer rundt til diverse virksomheder og ender med at få enkelte kunder. Men budskabet om at du har opstartet en virksomhed er ikke nået særlig langt ud. Du indtjener $10",
        options: [
            {target:9, txt:"Næste"}
        ]
    },
    {
        id:9,
        txt:"Du har nu været selvstændig i noget tid, og alt ser ud til at gå godt. Du har derfor nu mulighed for at fortsætte som enkelt mands virksomhed eller ansætte en studentermedhjælper.",
        options:[
            {target:10, txt:"Du vælger at ansætte en studentermedhjælper."},
            {target:24, txt:"Du vælger at fortsætte alene, uden nogle medarbejder"}
        ]
    },
    { //BRANCHING MED STUDIEMEDHJAELPER
        id:10,
        txt:"En kunde er kommet til dig og deadlinen er en smule stram. Din kunde ønsker en kampagne som sætter fokus på deres nye produkt. Dig og studiemedarbejderen deler arbejdet mellem jer.",
        options:[
            {target:11 , txt:"Næste"}
        ]
    },
    {
        id:11,
        txt:"Kunden er tilfreds med arbejdet og anbefaler din virksomhed til andre. Studentermedhjælperen koster -$10. Du tjener på kommende kunder $30",
        options:[
            {target:12, txt:"Næste"}
        ]
    },
    {
        id:12,
        txt:"Din kunde var tilfreds, så du og din studentermedhjælper har travlt med at arbejde igennem den lange liste af nye tilstrømmende kunder.",
        options:[
            {target:13, txt:"Du ansætter en mere erfaren fuldtidsmedarbejder, og begynder at tage imod større kundeopgaver."},
            {target:14, txt:"Du tager kun imod små kundeopgaver, sammen med din studiemedhjælper."}
        ]
    },
    {
        id:13,
        txt:"Din indtægt er steget, da du ved at have ansat endnu en medarbejder nu kan acceptere flere og større projekter. Den nye medarbejder koster -$30. Du tjener $60",
        options:[
            {target:15 , txt:"Næste"}
        ]
    },
    {
        id:14,
        txt:"Du tjener stadig selvom du kun acceptere små kunde opgaver. Du ville dog have kunnet tjent mere hvis du havde ansat endnu en medarbejder. Du tjener $10",
        options:[
            {target:15 , txt:"Næste"}
        ]
    },
    {
        id:15,
        txt:"Grundet de mange forskellige opgaver, som kræver forskellige programmer, begynder din computer at køre dårligere, hvilket påvirker opgaverne og skubber deadlines.",
        options:[
            {target:16 , txt:"Du vælger at vente med at skaffe en bedre computer til et senere tidspunkt"},
            {target:17, txt:"Du vælger at skaffe en bedre computer for at kunne nå deadlines og få tilfredse kunder"}
        ]
    },
    {
        id:16,
        txt:"Din computer er blevet markant langsommere og giver problemer med nuværende og kommende deadlines.",
        options:[
            {target:18 , txt:"Næste"}
        ]
    },
    {
        id:17,
        txt:"Du køber en ny computer, som betydeligt forbedre dit arbejdshastighed. Den nye computer koster -$20. Du tjener $40",
        options:[
            {target:19, txt:"Næste"}
        ]
    },
    {
        id:18,
        txt:"Computeren bryder sammen, og du må desværre vente 2 uger før en ny kan komme. Det resultere i at du må udskyde deadlines med dine kunder. Grundet din manglende rettidig omhu vil du komme til at miste indtægt i den periode, hvor du ingen computer har.Det koster dig -$30",
        options:[
            {target:20, txt:"Næste"}
        ]
    },
    { /*   DETTE ER CHANCE DELEN       */
        id:19,
        heading:"Tag en chance!",
        txt:"Du har muligheden for at tjene lidt ekstra, da en klient opsøger dig og gerne vil have dig til at lave projektet. Deadlinen er kort, men du vil forsøge at finde tid til det.Du har 3 forsøg til at slå en 6'er.",
        options:[ 
            {target:33, txt:"Næste"}
        ],
    },
    {
        id:20,
        txt:"På trods af de problemer din virksomhed har stødt på, så er den kommet godt ud af dem. Da virksomheden nu har været i gang i et stykke tid, så er det også ved at være tid til at lave regnskab.",
        options:[
            {target:21, txt:"Du vælger at fokusere på dine kunder og ikke forberede dig til den opkommende regnskab."},
            {target:22, txt:"Du vælger at fokusere noget af din arbejdstid på at forberede dig til regnskab."}
        ]
    },
    {
        id:21,
        txt:"Dagen er kommet for status og revisoren er kommet. Revisoren kan ikke finde det han leder efter og han ender med at bruge længere tid ved dig.Det koster $20",
        options:[
            {target:35, txt:"Næste"}
        ]
    },
    {
        id:22,
        txt:"Dagen er kommet for status. Da revisoren ankommer ligger alle dokumenter klar og han tager hurtigt videre til hans næste klient. Det koster $10",
        options:[
            {target:23, txt:"Næste"}
        ]
    },  
    { /*   DETTE ER CHANCE DELEN       */
        id:23,
        heading:"Tag en chance!",
        txt:"Du har muligheden for at tjene lidt ekstra, da en klient opsøger dig og gerne vil have dig til at lave projektet. Deadlinen er kort, men du vil forsøge at finde tid til det.Du har 3 forsøg til at slå en 6'er.",
        options:[ 
            {target:35, txt:"Næste"}
        ],
    },
    {//BRANCHING UDEN STUDIEMEDHJÆLPER
    id:24,
        txt:"En kunde er kommet til dig og deadlinen er en smule stram. Din kunde ønsker en kampagne som sætter fokus på deres nye produkt.",
        options:[
            {target:25, txt:"Næste"}
        ]
    },
    {
        id:25,
        txt:"Kunden er ikke tilfreds med arbejdet og anbefaler dig derfor ikke til andre i deres omkreds. Du tjener $10.",
        options:[
            {target:26, txt:"Næste"}
        ]
    }, 
    {
        id:26,
        txt:"Kunden var ikke tilfreds med dit arbejde og du overvejer derfor om du burde ansætte en studentermedhjælper til at hjælpe med større opgaver, så det samme ikke sker igen.",
        options:[
            {target:27, txt:"Du vælger ikke at ansætte en, men derimod arbejde videre alene. Du vil dog kun tage imod opgaver med længere deadlines"},
            {target:28, txt:"Du ansætter en studentermedhjælper, så du kan tage imod flere opgaver med både korte- og lange deadlines, "}
        ]
    }, 
    {
        id:27,
        txt:"Da du har valgt at fortsætte med at arbejde alene, vælger du ikke at acceptere større opgaver og mister derfor muligheden for en større økonomisk fortjeneste. Du tjener $10",
        options:[
            {target:15, txt:"Næste"}
        ]
    }, 
    {
        id:28,
        txt:"Du ansætter en studentermedhjælper, så du kan fordele arbejdspresset og varetage større arbejdsopgaver som også har større økonomiske fortjenester. Studentermedhjælperen koster - $20. Du tjener $40",
        options:[
            {target:29, txt:"Næste"}
        ]
    }, 
    { /*   DETTE ER CHANCE DELEN       */
        id:29,
        heading:"Tag en chance!",
        txt:"Du har muligheden for at tjene lidt ekstra, da en klient opsøger dig og gerne vil have dig til at lave projektet. Deadlinen er kort, men du vil forsøge at finde tid til det.Du har 3 forsøg til at slå en 6'er.",
        options:[ 
            {target:30, txt:"Næste"},
        
        ],
    },
    {
        id:30,
        txt:"I har taget i mod mange store opgaver, som giver et stort arbejdspres derfor har du og din medarbejder brug for en bedere computer for at kunne følge med.0",
        options:[
            {target:31, txt:"Du venter med at skaffe en bedre computer, da den trodsalt stadig kan bruges."},
            {target:32, txt:"Du vælger at købe en bedre computer for at sikre, at I kan nå deadlines."}
        ]
    },
    {
        id:31,
        txt:"Din medarbejder begynder at have bøvl med computeren og det giver problemer med nuværende og kommende deadlines.",
        options:[
            {target:20, txt:"Næste"}
        ]
    },
    {
        id:32,
        txt:"Du køber nye computer til din medarbejder, og det gør at deres arbejdshastighed er hurtigere og de når deres deadlines. Du får endnu flere tilfredse kunder. Den nye computer koster -$20. Du tjener $40",
        options:[
            {target:33, txt:"Næste"}
        ]
    },
    {
        id:33,
        txt:"Det går godt for din virksomhed. Da virksomheden nu har været i gang i et stykke tid, så er det også ved at være tid til at lave regnskab.",
        options:[
            {target:21, txt:"Du vælger at fokusere på dine kunder og ikke forberede dig til den opkommende regnskab."},
            {target:34, txt:"Du vælger at fokusere noget af din arbejdstid på at forberede dig til regnskab."}
        ]
    },
    { /*   DETTE ER CHANCE DELEN       */
        id:34,
        heading:"Tag en chance!",
        txt:"Du har muligheden for at tjene lidt ekstra, da en klient opsøger dig og gerne vil have dig til at lave projektet. Deadlinen er kort, men du vil forsøge at finde tid til det.Du har 3 forsøg til at slå en 6'er.",
        options:[ 
            {target:35, txt:"Næste"}
        
        ],
    },
    { /* DETTE ER SLUTNINGEN AF SPILLET!! */
        id:35,
        txt:"Regnskabet er ordnet, så lad os se hvordan det er gået din virksomhed indtil nu"
    },
]


function scenarieStart(stepIndex) { // denne starter scenariet
    const currentStep = steps[stepIndex]; //henter det step man er på

    heading_element.textContent =currentStep.heading;
    txt_element.textContent = currentStep.txt; //justere teksten så det passer til hvor man er/henter txt fra den step man er på

    buttonsContainer.innerHTML = ""; //fjerner knapperne i html, så de kun dukker op i det antal af targets man har, prøvede at slette dem helt i html og denne linje men så fungere det ikke. 

    currentStep.options.forEach((option, index) => { //kører de forskellige valgmuligheder igennem for hvert step
        const button = document.createElement("button");//danner knapper for hver valgmulighed der er
        button.textContent = option.txt; //indsætter txt for hver valgmulighed på knappen
        button.classList.add("btn"); //tilføjer styling på knappen
    
        button.addEventListener("click", () => { //tilføjer en event, så knapperne rent faktisk kan navigerer
            scenarieStart(option.target);//denne kigger efter de valgt man har taget og kører en videre til det næste step
        });
 
        buttonsContainer.appendChild(button);//skaber knapperne som barn af containeren/tilføjer knappen til html igen
    });
}


//denne sikre at det hele starter fra step 0
scenarieStart(0);

