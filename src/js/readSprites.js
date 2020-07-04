const fs = require('fs')
const path = require('path')
const convertFileName = require('./utils.js').convertFileName

function readFileName(p) {
  let a = {}
  let b = {}
  function read (p) {
    let files = []
    results = fs.readdirSync(p)
    results.forEach((result) => {
      let subPath = path.join(p, result)
      let stat = fs.statSync(subPath)
      if (stat.isDirectory()) {
        let temp = read(subPath)
        a[result] = temp
      } else if (stat.isFile()) {
        files.push(result)
      }
    })
    return files
  }
  read(p)
  return a
}

// function convertFileName(fileName) {
//   // return fileName.replace(/\s\(\)\.png/, '')
//   return fileName.replace(/(\s\(.*\))?\.png/, '')
// }

function convertDirName(dirname) {
  return dirname.slice(3).replace(/ /g, '_')
}

function getFrameSize(fileName) {
  let re = /\((\d+)x(\d+)\)/
  let result = re.exec(fileName)
  let width = Number(result[1])
      height = Number(result[2])
  return {width, height}
}

function genSpriteList(srcList) {
  let list = {}
  for (let dir in srcList) {
    // let role = convertDirName(dir)
    let role = dir.slice(3)
    if (!list[role]) list[role] = {}
    for (let src of srcList[dir]) {
      let name = convertFileName(src)
      let size = getFrameSize(src)
      // list[role][name] = path.resolve(__dirname, 'assets/sprite', dir, src)
      list[role][name] = {
        src: './assets/Sprites/' + dir + '/' + src,
        width: size.width,
        height: size.height
      }
    }
  }
  return list
}

spriteDir = '../assets/Sprites'
let srcList = readFileName(spriteDir)
srcList = genSpriteList(srcList)

console.log(srcList)

/* result
{
  'King Human': {
    Attack: {
      src: './assets/Sprites/01-King Human/Attack (78x58).png',
      width: 78,
      height: 58
    },
    Dead: {
      src: './assets/Sprites/01-King Human/Dead (78x58).png',
      width: 78,
      height: 58
    },
    'Door In': {
      src: './assets/Sprites/01-King Human/Door In (78x58).png',
      width: 78,
      height: 58
    },
    'Door Out': {
      src: './assets/Sprites/01-King Human/Door Out (78x58).png',
      width: 78,
      height: 58
    },
    Fall: {
      src: './assets/Sprites/01-King Human/Fall (78x58).png',
      width: 78,
      height: 58
    },
    Ground: {
      src: './assets/Sprites/01-King Human/Ground (78x58).png',
      width: 78,
      height: 58
    },
    Hit: {
      src: './assets/Sprites/01-King Human/Hit (78x58).png',
      width: 78,
      height: 58
    },
    Idle: {
      src: './assets/Sprites/01-King Human/Idle (78x58).png',
      width: 78,
      height: 58
    },
    Jump: {
      src: './assets/Sprites/01-King Human/Jump (78x58).png',
      width: 78,
      height: 58
    },
    Run: {
      src: './assets/Sprites/01-King Human/Run (78x58).png',
      width: 78,
      height: 58
    }
  },
  'King Pig': {
    Attack: {
      src: './assets/Sprites/02-King Pig/Attack (38x28).png',
      width: 38,
      height: 28
    },
    Dead: {
      src: './assets/Sprites/02-King Pig/Dead (38x28).png',
      width: 38,
      height: 28
    },
    Fall: {
      src: './assets/Sprites/02-King Pig/Fall (38x28).png',
      width: 38,
      height: 28
    },
    Ground: {
      src: './assets/Sprites/02-King Pig/Ground (38x28).png',
      width: 38,
      height: 28
    },
    Hit: {
      src: './assets/Sprites/02-King Pig/Hit (38x28).png',
      width: 38,
      height: 28
    },
    Idle: {
      src: './assets/Sprites/02-King Pig/Idle (38x28).png',
      width: 38,
      height: 28
    },
    Jump: {
      src: './assets/Sprites/02-King Pig/Jump (38x28).png',
      width: 38,
      height: 28
    },
    Run: {
      src: './assets/Sprites/02-King Pig/Run (38x28).png',
      width: 38,
      height: 28
    }
  },
  Pig: {
    Attack: {
      src: './assets/Sprites/03-Pig/Attack (34x28).png',
      width: 34,
      height: 28
    },
    Dead: {
      src: './assets/Sprites/03-Pig/Dead (34x28).png',
      width: 34,
      height: 28
    },
    Fall: {
      src: './assets/Sprites/03-Pig/Fall (34x28).png',
      width: 34,
      height: 28
    },
    Ground: {
      src: './assets/Sprites/03-Pig/Ground (34x28).png',
      width: 34,
      height: 28
    },
    Hit: {
      src: './assets/Sprites/03-Pig/Hit (34x28).png',
      width: 34,
      height: 28
    },
    Idle: {
      src: './assets/Sprites/03-Pig/Idle (34x28).png',
      width: 34,
      height: 28
    },
    Jump: {
      src: './assets/Sprites/03-Pig/Jump (34x28).png',
      width: 34,
      height: 28
    },
    Run: {
      src: './assets/Sprites/03-Pig/Run (34x28).png',
      width: 34,
      height: 28
    }
  },
  'Pig Throwing a Box': {
    Idle: {
      src: './assets/Sprites/04-Pig Throwing a Box/Idle (26x30).png',
      width: 26,
      height: 30
    },
    'Picking Box': {
      src: './assets/Sprites/04-Pig Throwing a Box/Picking Box (26x30).png',
      width: 26,
      height: 30
    },
    Run: {
      src: './assets/Sprites/04-Pig Throwing a Box/Run (26x30).png',
      width: 26,
      height: 30
    },
    'Throwing Box': {
      src: './assets/Sprites/04-Pig Throwing a Box/Throwing Box (26x30).png',
      width: 26,
      height: 30
    }
  },
  'Pig Thowing a Bomb': {
    Idle: {
      src: './assets/Sprites/05-Pig Thowing a Bomb/Idle (26x26).png',
      width: 26,
      height: 26
    },
    'Picking Bomb': {
      src: './assets/Sprites/05-Pig Thowing a Bomb/Picking Bomb (26x26).png',
      width: 26,
      height: 26
    },
    Run: {
      src: './assets/Sprites/05-Pig Thowing a Bomb/Run (26x26).png',
      width: 26,
      height: 26
    },
    'Throwing Boom': {
      src: './assets/Sprites/05-Pig Thowing a Bomb/Throwing Boom (26x26).png',
      width: 26,
      height: 26
    }
  },
  'Pig Hide in the Box': {
    Fall: {
      src: './assets/Sprites/06-Pig Hide in the Box/Fall (26x20).png',
      width: 26,
      height: 20
    },
    Ground: {
      src: './assets/Sprites/06-Pig Hide in the Box/Ground (26x20).png',
      width: 26,
      height: 20
    },
    Jump: {
      src: './assets/Sprites/06-Pig Hide in the Box/Jump (26x20).png',
      width: 26,
      height: 20
    },
    'Jump Anticipation': {
      src: './assets/Sprites/06-Pig Hide in the Box/Jump Anticipation (26x20).png',
      width: 26,
      height: 20
    },
    'Looking Out': {
      src: './assets/Sprites/06-Pig Hide in the Box/Looking Out (26x20).png',
      width: 26,
      height: 20
    }
  },
  'Pig With a Match': {
    'Lighting the Cannon': {
      src: './assets/Sprites/07-Pig With a Match/Lighting the Cannon (26x18).png',
      width: 26,
      height: 18
    },
    'Lighting the Match': {
      src: './assets/Sprites/07-Pig With a Match/Lighting the Match (26x18).png',
      width: 26,
      height: 18
    },
    'Match On': {
      src: './assets/Sprites/07-Pig With a Match/Match On (26x18).png',
      width: 26,
      height: 18
    }
  },
  Box: {
    'Box Pieces 1': {
      src: './assets/Sprites/08-Box/Box Pieces 1 (10x10).png',
      width: 10,
      height: 10
    },
    'Box Pieces 2': {
      src: './assets/Sprites/08-Box/Box Pieces 2 (10x10).png',
      width: 10,
      height: 10
    },
    'Box Pieces 3': {
      src: './assets/Sprites/08-Box/Box Pieces 3 (10x10).png',
      width: 10,
      height: 10
    },
    'Box Pieces 4': {
      src: './assets/Sprites/08-Box/Box Pieces 4 (10x10).png',
      width: 10,
      height: 10
    },
    Hit: {
      src: './assets/Sprites/08-Box/Hit (22x16).png',
      width: 22,
      height: 16
    },
    Idle: {
      src: './assets/Sprites/08-Box/Idle (22x16).png',
      width: 22,
      height: 16
    }
  },
  Bomb: {
    'Bomb Off': {
      src: './assets/Sprites/09-Bomb/Bomb Off (52x56).png',
      width: 52,
      height: 56
    },
    'Bomb On': {
      src: './assets/Sprites/09-Bomb/Bomb On (52x56).png',
      width: 52,
      height: 56
    },
    Boooooom: {
      src: './assets/Sprites/09-Bomb/Boooooom (52x56).png',
      width: 52,
      height: 56
    }
  },
  Cannon: {
    'Cannon Ball': {
      src: './assets/Sprites/10-Cannon/Cannon Ball (44x28).png',
      width: 44,
      height: 28
    },
    Idle: {
      src: './assets/Sprites/10-Cannon/Idle (44x28).png',
      width: 44,
      height: 28
    },
    Shoot: {
      src: './assets/Sprites/10-Cannon/Shoot (44x28).png',
      width: 44,
      height: 28
    }
  },
  Door: {
    Closiong: {
      src: './assets/Sprites/11-Door/Closiong (46x56).png',
      width: 46,
      height: 56
    },
    Idle: {
      src: './assets/Sprites/11-Door/Idle (46x56).png',
      width: 46,
      height: 56
    },
    Opening: {
      src: './assets/Sprites/11-Door/Opening (46x56).png',
      width: 46,
      height: 56
    }
  },
  'Live and Coins': {
    'Big Diamond Hit': {
      src: './assets/Sprites/12-Live and Coins/Big Diamond Hit (18x14).png',
      width: 18,
      height: 14
    },
    'Big Diamond Idle': {
      src: './assets/Sprites/12-Live and Coins/Big Diamond Idle (18x14).png',
      width: 18,
      height: 14
    },
    'Big Heart Hit': {
      src: './assets/Sprites/12-Live and Coins/Big Heart Hit (18x14).png',
      width: 18,
      height: 14
    },
    'Big Heart Idle': {
      src: './assets/Sprites/12-Live and Coins/Big Heart Idle (18x14).png',
      width: 18,
      height: 14
    },
    'Live Bar': {
      src: './assets/Sprites/12-Live and Coins/Live Bar (66x34).png',
      width: 66,
      height: 34
    },
    Numbers: {
      src: './assets/Sprites/12-Live and Coins/Numbers (6x8).png',
      width: 6,
      height: 8
    },
    'Small Diamond': {
      src: './assets/Sprites/12-Live and Coins/Small Diamond (18x14).png',
      width: 18,
      height: 14
    },
    'Small Heart Hit': {
      src: './assets/Sprites/12-Live and Coins/Small Heart Hit (18x14).png',
      width: 18,
      height: 14
    },
    'Small Heart Idle': {
      src: './assets/Sprites/12-Live and Coins/Small Heart Idle (18x14).png',
      width: 18,
      height: 14
    }
  },
  'Dialogue Boxes': {
    '!!! In': {
      src: './assets/Sprites/13-Dialogue Boxes/!!! In (24x8).png',
      width: 24,
      height: 8
    },
    '!!! Out': {
      src: './assets/Sprites/13-Dialogue Boxes/!!! Out (24x8).png',
      width: 24,
      height: 8
    },
    'Attack In': {
      src: './assets/Sprites/13-Dialogue Boxes/Attack In (24x8).png',
      width: 24,
      height: 8
    },
    'Attack Out': {
      src: './assets/Sprites/13-Dialogue Boxes/Attack Out (24x8).png',
      width: 24,
      height: 8
    },
    'Boom In': {
      src: './assets/Sprites/13-Dialogue Boxes/Boom In (24x8).png',
      width: 24,
      height: 8
    },
    'Boom Out': {
      src: './assets/Sprites/13-Dialogue Boxes/Boom Out (24x8).png',
      width: 24,
      height: 8
    },
    'Dead In': {
      src: './assets/Sprites/13-Dialogue Boxes/Dead In (24x8).png',
      width: 24,
      height: 8
    },
    'Dead Out': {
      src: './assets/Sprites/13-Dialogue Boxes/Dead Out (24x8).png',
      width: 24,
      height: 8
    },
    'Hello In': {
      src: './assets/Sprites/13-Dialogue Boxes/Hello In (24x8).png',
      width: 24,
      height: 8
    },
    'Hello Out': {
      src: './assets/Sprites/13-Dialogue Boxes/Hello Out (24x8).png',
      width: 24,
      height: 8
    },
    'Hi In': {
      src: './assets/Sprites/13-Dialogue Boxes/Hi In (24x8).png',
      width: 24,
      height: 8
    },
    'Hi Out': {
      src: './assets/Sprites/13-Dialogue Boxes/Hi Out (24x8).png',
      width: 24,
      height: 8
    },
    'Interrogation In': {
      src: './assets/Sprites/13-Dialogue Boxes/Interrogation In (24x8).png',
      width: 24,
      height: 8
    },
    'Interrogation Out': {
      src: './assets/Sprites/13-Dialogue Boxes/Interrogation Out (24x8).png',
      width: 24,
      height: 8
    },
    'Loser In': {
      src: './assets/Sprites/13-Dialogue Boxes/Loser In (24x8).png',
      width: 24,
      height: 8
    },
    'Loser Out': {
      src: './assets/Sprites/13-Dialogue Boxes/Loser Out (24x8).png',
      width: 24,
      height: 8
    },
    'No In': {
      src: './assets/Sprites/13-Dialogue Boxes/No In (24x8).png',
      width: 24,
      height: 8
    },
    'No Out': {
      src: './assets/Sprites/13-Dialogue Boxes/No Out (24x8).png',
      width: 24,
      height: 8
    },
    'WTF In': {
      src: './assets/Sprites/13-Dialogue Boxes/WTF In (24x8).png',
      width: 24,
      height: 8
    },
    'WTF Out': {
      src: './assets/Sprites/13-Dialogue Boxes/WTF Out (24x8).png',
      width: 24,
      height: 8
    }
  },
  TileSets: {
    Decorations: {
      src: './assets/Sprites/14-TileSets/Decorations (32x32).png',
      width: 32,
      height: 32
    },
    Terrain: {
      src: './assets/Sprites/14-TileSets/Terrain (32x32).png',
      width: 32,
      height: 32
    }
  }
}

*/