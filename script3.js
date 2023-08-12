const BUTTON = document.querySelector('button');
const MEN = document.querySelector('.men');
const WOMEN = document.querySelector('.women');
let PLUS = document.querySelector('.plus');
let LESS = document.querySelector('.less');
let main = document.querySelector('#container')
let loadIcon = document.querySelector('#loading')
let animate = document.querySelector('#loading img')
let resultsDIV = document.querySelector('#resultados')
let infoDIV = document.querySelector('#info')
let controlPlayers = {}

men = []
women = []
possibleTeams = []
possibleGames = []
teams = []
jornadas = 0

playersColorList = {}

const menColors = [
    "#E74C3C", // Red
    "#3498DB", // Blue
    "#2ECC71", // Green
    "#F39C12", // Yellow
    "#9B59B6", // Purple
    "#E67E22", // Orange
  ];
  
  const womenColors = [
    "#F1948A", // Light Red
    "#A9CCE3", // Light Blue
    "#A2D9A2", // Light Green
    "#F9E79F", // Light Yellow
    "#D7BDE2", // Light Purple
    "#F5B7B1", // Light Orange
  ];
  

function reset(obj) {
    let keys = Object.keys(obj)
    keys.forEach(key => {
        let keys2 = Object.keys(obj[key])
        keys2.forEach(key2 => {
            obj[key][key2]=0
        })
    })
}

function randomNumber(max) {
    return Math.floor(Math.random() * max);
}


    PLUS.addEventListener('click', (elem) => {
        div = document.createElement('div');
        div2 = document.createElement('div');
        div.classList.add('box');
        div2.classList.add('box');
        div.innerHTML = `<label for="mulher1">Jogador:</label>
        <input type="text" name="mulher1" class="homem">`;
        MEN.appendChild(div);
        div2.innerHTML = `<label for="mulher1">Jogador:</label>
            <input type="text" name="mulher1" class="mulher">`;
        WOMEN.appendChild(div2);
        let PLUS = document.querySelectorAll('i');
        })

    LESS.addEventListener('click', (elem) => {
        let menDivs = document.querySelectorAll('.men .box');
        let womenDivs = document.querySelectorAll('.women .box');
        if (menDivs.length > 1) {
        menDivs[menDivs.length-1].remove();
        womenDivs[womenDivs.length-1].remove();
        }
    })

BUTTON.addEventListener('click', () => {
    let playersList = document.querySelectorAll('input')
    let menPlayers = []
    let womenPlayers = []
    playersList.forEach(elem => {
        if (elem.classList.contains('homem') && elem.value!="") {
        menPlayers.push(elem.value)
    } else if (elem.value!=""){
        womenPlayers.push(elem.value)
    }
    })
    men = [...menPlayers]
    women = [...womenPlayers]
    colorList(men, women)
    joinedPlayer = men.concat(women)
    joinedPlayer.forEach(player => {
        controlPlayers[player] = {}
    })
    joinedPlayer.forEach(player => {
        for (a=0; a<joinedPlayer.length; a++) {
            if (player != joinedPlayer[a]) {
                controlPlayers[player][joinedPlayer[a]]=0
            }
        }
    })
    jornadas = men.length                                                                                                           
    if (men.length==women.length && men.length%2==0) {
        loadIcon.classList.remove('hide')
        animate.classList.add('animationOn')
        main.classList.add('hide')
        setTimeout(() => {
            matchCreator();
        }, 10);
    } else {
        console.log('O número de jogadores do sexo masculino e feminino devem ser iguais')
        console.log('O número de jogadores deve ser par. Função para gerar jogos com uma equipa de fora em cada jornada ainda não disponível')
    }
    
})

function colorList(men, women) {
    let control = 0
    men.forEach(player => {
        playersColorList[player]=menColors[control]
        control++
    })
    control=0
    women.forEach(player => {
        playersColorList[player]=womenColors[control]
        control++
    })
    console.log(playersColorList)
}

function testTeams(pl1, pl2, pl3, pl4) {
    if (controlPlayers[pl1][pl3]<2 && 
        controlPlayers[pl1][pl4]<2 &&
        controlPlayers[pl2][pl3]<2 && 
        controlPlayers[pl2][pl4]<2 &&
        controlPlayers[pl3][pl1]<2 && 
        controlPlayers[pl3][pl2]<2 &&
        controlPlayers[pl4][pl1]<2 && 
        controlPlayers[pl4][pl2]<2) {
            return 1
        } else {
            return 0
        }
}

function matchCreator() {
    timestampGlobal = Date.now()
for (a=0; a<jornadas; a++) {
    timestamp = Date.now()
    menPlayers = [...men]
    womenPlayers = [...women]
    cycles = 0
    breakFlag = false;
	//console.log(`Jornada ${a+1}`)
    let player1, player2, player3, player4, team1, team2;

    for (i=0; i<jornadas/2; i++) {
        let test
        do {
        player1 = menPlayers[randomNumber(menPlayers.length)]
        player2 = womenPlayers[randomNumber(womenPlayers.length)]
        player3 = menPlayers[randomNumber(menPlayers.length)]
        player4 = womenPlayers[randomNumber(womenPlayers.length)]
        if (Date.now() - timestamp > 300) {
            teams = [];
            a=-1;
            breakFlag = true;
            reset(controlPlayers)
            break;
        }

        test = testTeams(player1, player2, player3, player4)

        } while (teams.includes(`${player1}/${player2}`) || teams.includes(`${player3}/${player4}`) || test==0 || player1 == player3 || player2 == player4)
        if (breakFlag) {
            continue;
        }
        controlPlayers[player1][player3]+=1; 
        controlPlayers[player1][player4]+=1;
        controlPlayers[player2][player3]+=1;
        controlPlayers[player2][player4]+=1;
        controlPlayers[player3][player1]+=1;
        controlPlayers[player3][player2]+=1;
        controlPlayers[player4][player1]+=1;
        controlPlayers[player4][player2]+=1;
        //console.log(teams.includes(`${player1}/${player2}`) , teams.includes(`${player3}/${player4}`))
        team1 = `${menPlayers.splice(menPlayers.indexOf(player1), 1)}/${womenPlayers.splice(womenPlayers.indexOf(player2), 1)}`
        team2 = `${menPlayers.splice(menPlayers.indexOf(player3), 1)}/${womenPlayers.splice(womenPlayers.indexOf(player4), 1)}`
        //console.log(`${team1} vs ${team2}`)
        teams.push(team1)
        teams.push(team2)
        }
    }
    executionTime = (Date.now() - timestampGlobal)/1000
    for (i=0; i<teams.length; i+=2) {
    console.log(`${teams[i]} vs ${teams[i+1]}`)
    }
    console.log(`Tempo de execução: ${executionTime}s`)
    loadIcon.classList.add('hide')
    animate.classList.remove('animationOn')
    //main.classList.remove('hide')
    showGame(teams, executionTime)
    console.log(controlPlayers)
}


/*
function showGame(teams, executionTime) {
    let numeroJornadas =  Math.sqrt(teams.length)
    let jogosPorJornada = numeroJornadas/2
    jornadasBreakpoints = []
    for(i=0;i<teams.length;i+=jogosPorJornada*2) {
        jornadasBreakpoints.push(i)
    }

    for (a=0;a<numeroJornadas;a++) {
        let jornadaIndex = jornadasBreakpoints[a]
        let div = document.createElement('div');
        div.classList.add('jogos');
        let p = document.createElement('h3');
        p.textContent = `Jornada #${a+1}`
        console.log(`Jornada #${a+1}`)
        div.appendChild(p)
        for(i=jornadaIndex;i<jornadaIndex+(jogosPorJornada*2);i+=2) {
            let p2 = document.createElement('p');
            p2.textContent = `${teams[i]} vs ${teams[i+1]}`
            div.appendChild(p2)
            console.log(`${teams[i]} vs ${teams[i+1]}`)
        }
        resultsDIV.appendChild(div)
    }
    let info = document.createElement('p')
    info.textContent = `Demorámos ${executionTime}s a criar este torneio. Quanto tempo demoraria você?`
    infoDIV.appendChild(info)
    resultsDIV.classList.remove('hide')
}*/

function showGame(teams, executionTime) {
    let numeroJornadas =  Math.sqrt(teams.length)
    let jogosPorJornada = numeroJornadas/2
    jornadasBreakpoints = []
    for(i=0;i<teams.length;i+=jogosPorJornada*2) {
        jornadasBreakpoints.push(i)
    }

    for (a=0;a<numeroJornadas;a++) {
        let jornadaIndex = jornadasBreakpoints[a]
        let div = document.createElement('div');
        let table = document.createElement('table');
        div.classList.add('jogos');
        let p = document.createElement('h3');
        p.textContent = `Jornada #${a+1}`
        console.log(`Jornada #${a+1}`)
        div.appendChild(p)
        for(i=jornadaIndex;i<jornadaIndex+(jogosPorJornada*2);i+=2) {
            let team1 = teamSplit(teams[i])
            let team2 = teamSplit(teams[i+1])
            let tr = document.createElement('tr');
            tr.innerHTML = `<th style="background-color:${playersColorList[team1[0]]}">${team1[0]}</th><th style="background-color:${playersColorList[team1[1]]}">${team1[1]}</th><th class="vs"> vs </th><th style="background-color:${playersColorList[team2[0]]}">${team2[0]}</th><th style="background-color:${playersColorList[team2[1]]}">${team2[1]}</th>`
            table.append(tr)
            console.log(`${teams[i]} vs ${teams[i+1]}`)
        }
        div.append(table)
        resultsDIV.appendChild(div)
    }
    let info = document.createElement('p')
    info.textContent = `Demorámos ${executionTime}s a criar este torneio. Quanto tempo demoraria você?`
    infoDIV.appendChild(info)
    resultsDIV.classList.remove('hide')
}

function teamSplit(players) {
    return players.split('/')
}