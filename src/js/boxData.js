/**
 * 在每一种状态下的每一帧，角色精灵图可能有整体 whole、身体 body（即可被攻击）和攻击 attack 三种区域，
 * 这些区域统称为盒子，用于判断角色是否与地图碰撞（重叠）、攻击命中敌人、被攻击命中并改变状态，
 * 考虑到随时可能修改盒子，所以保留空白的状态对象
 **/ 
export default {
  'King Human': {
    Attack: {
      whole: [
        {x: 19, y: 0, w: 59, h: 58},
        {x: 22, y: 4, w: 48, h: 40},
        {x: 9, y: 16, w: 37, h: 28}
      ],
      body: [
        {x: 23, y: 16, w: 17, h: 24},
        {x: 23, y: 15, w: 17, h: 25},
        {x: 23, y: 16, w: 17, h: 26}
      ],
      attack: [
        [{x: 51, y: 6, w: 27, h: 52}, {x: 19, y: 45, w: 32, h: 13}],
        {x: 45, y: 4, w: 26, h: 40}
      ]
    },
    Dead: {
      whole: [
        {x: 6, y: 18, w: 37, h: 26},
        {x: 2, y: 25, w: 38, h: 24},
        {x: 1, y: 26, w: 38, h: 21},
        {x: 0, y: 27, w: 38, h: 22}
      ]
    },
    'Door In': { /* blank */ },
    'Door Out': { /* blank */ },
    Fall: {
      whole: [
        {x: 9, y: 15, w: 37, h: 29}
      ],
      body: [
        {x: 23, y: 15, w: 17, h: 27}
      ]
    },
    Ground: {
      whole: [
        {x: 9, y: 20, w: 37, h: 25}
      ],
      body: [
        {x: 22, y: 20, w: 19, h: 24}
      ]
    },
    Hit: {
      whole: [
        {x: 7, y: 15, w: 37, h: 25},
        {x: 8, y: 15, w: 37, h: 26}
      ]
    },
    Idle: {
      whole: [
        {x: 9, y: 18, w: 37, h: 26},
        {x: 9, y: 18, w: 37, h: 26},
        {x: 9, y: 18, w: 37, h: 26},
        {x: 9, y: 18, w: 37, h: 26},
        {x: 9, y: 18, w: 37, h: 26},
        {x: 9, y: 18, w: 37, h: 26},
        {x: 9, y: 17, w: 37, h: 27},
        {x: 9, y: 16, w: 37, h: 28},
        {x: 9, y: 16, w: 37, h: 28},
        {x: 9, y: 17, w: 37, h: 27},
        {x: 9, y: 18, w: 37, h: 26}
      ]
      body: [
        {x: 23, y: 18, w: 18, h: 26},
        {x: 23, y: 18, w: 18, h: 26},
        {x: 23, y: 18, w: 18, h: 26},
        {x: 23, y: 18, w: 18, h: 26},
        {x: 23, y: 18, w: 18, h: 26},
        {x: 23, y: 18, w: 18, h: 26},
        {x: 23, y: 17, w: 17, h: 27},
        {x: 23, y: 16, w: 17, h: 28},
        {x: 23, y: 16, w: 17, h: 28},
        {x: 23, y: 17, w: 17, h: 27},
        {x: 23, y: 18, w: 17, h: 27}
      ]
    },
    Jump: {
      whole: [
        {x: 9, y: 15, w: 37, h: 29}
      ]
      body: [
        {x: 23, y: 15, w: 17, h: 27}
      ]
    },
    Run: {
      whole: [
        {x: 9, y: 18, w: 37, h: 25},
        {x: 9, y: 16, w: 37, h: 26},
        {x: 9, y: 17, w: 37, h: 26},
        {x: 9, y: 20, w: 37, h: 25},
        {x: 9, y: 18, w: 37, h: 25},
        {x: 9, y: 16, w: 37, h: 26},
        {x: 9, y: 17, w: 37, h: 26},
        {x: 9, y: 20, w: 37, h: 25}
      ],
      body: [
        {x: 23, y: 18, w: 17, h: 23},
        {x: 23, y: 16, w: 17, h: 24},
        {x: 23, y: 17, w: 17, h: 24},
        {x: 23, y: 20, w: 17, h: 23},
        {x: 23, y: 18, w: 17, h: 24},
        {x: 23, y: 17, w: 17, h: 25},
        {x: 23, y: 17, w: 17, h: 25},
        {x: 23, y: 20, w: 17, h: 23}
      ]
    }
  },
  'King Pig': {
    Attack: {
      whole: [
        {x: 9, y: 9, w: 20, h: 19},
        {x: 9, y: 10, w: 20, h: 18},
        {x: 0, y: 0, w: 28, h: 23},
        {x: 3, y: 0, w: 25, h: 23},
        {x: 9, y: 9, w: 20, h: 19}
      ],
      body: [
        {x: 9, y: 12, w: 20, h: 16},
        {x: 9, y: 12, w: 20, h: 16},
        {x: 9, y: 6, w: 19, h: 17},
        {x: 10, y: 7, w: 18, h: 17},
        {x: 9, y: 13, w: 20, h: 15}
      ],
      attack: [
        null, null,
        {x: 0, y: 2, w: 9, h: 21},
        [{x: 4, y: 0, w: 8, h: 6}, {x: 4, y: 6, w: 2, h: 4}]
      ]
    },
    Dead: {
      whole: [
        {x: 10, y: 7, w: 19, h: 21},
        {x: 13, y: 12, w: 22, h: 16},
        {x: 14, y: 13, w: 23, h: 15},
        {x: 16, y: 12, w: 21, h: 16}
      ]
    },
    Fall: {
      whole: [
        {x: 9, y: 6, w: 19, h: 22}
      ],
      body: [
        {x: 10, y: 10, w: 18, h: 18}
      ]
    },
    Ground: {
      whole: [
        {x: 9, y: 9, w: 20, h: 19}
      ],
      body: [
        {x: 9, y: 13, w: 20, h: 15}
      ]
    },
    Hit: {
      whole: [
        {x: 11, y: 3, w: 18, h: 21},
        {x: 10, y: 5, w: 18, h: 21}
      ]
    },
    Idle: {
      whole: [
        {x: 10, y: 8, w: 18, h: 20},
        {x: 10, y: 8, w: 18, h: 20},
        {x: 10, y: 8, w: 18, h: 20},
        {x: 10, y: 8, w: 18, h: 20},
        {x: 10, y: 8, w: 18, h: 20},
        {x: 10, y: 8, w: 18, h: 20},
        {x: 10, y: 8, w: 18, h: 20},
        {x: 10, y: 7, w: 18, h: 21},
        {x: 10, y: 5, w: 18, h: 23},
        {x: 9, y: 6, w: 19, h: 22},
        {x: 9, y: 7, w: 19, h: 21},
        {x: 10, y: 9, w: 18, h: 19}
      ],
      body: [
        {x: 11, y: 11, w: 16, h: 17},
        {x: 11, y: 11, w: 16, h: 17},
        {x: 11, y: 11, w: 16, h: 17},
        {x: 11, y: 11, w: 16, h: 17},
        {x: 11, y: 11, w: 16, h: 17},
        {x: 11, y: 11, w: 16, h: 17},
        {x: 11, y: 11, w: 16, h: 17},
        {x: 11, y: 10, w: 16, h: 18},
        {x: 11, y: 9, w: 16, h: 19},
        {x: 11, y: 11, w: 16, h: 17},
        {x: 11, y: 12, w: 16, h: 16}
      ]
    },
    Jump: {
      whole: [
        {x: 10, y: 6, w: 18, h: 22}
      ],
      body: [
        {x: 10, y: 10, w: 18, h: 18}
      ]
    },
    Run: {
      whole: [
        {x: 9, y: 6, w: 19, h: 19},
        {x: 9, y: 7, w: 19, h: 20},
        {x: 10, y: 8, w: 18, h: 20},
        {x: 10, y: 6, w: 18, h: 20},
        {x: 10, y: 7, w: 18, h: 20},
        {x: 10, y: 8, w: 18, h: 20}
      ]
      body: [
        {x: 10, y: 11, w: 18, h: 15},
        {x: 10, y: 10, w: 17, h: 17},
        {x: 11, y: 11, w: 16, h: 17},
        {x: 10, y: 10, w: 18, h: 16},
        {x: 10, y: 10, w: 18, h: 17},
        {x: 10, y: 11, w: 18, h: 17}
      ]
    }
  },
  Pig: {
    Attack: {
      body: []
    },
    Dead: {
      body: []
    },
    Fall: {
      body: []
    },
    Ground: {
      body: []
    },
    Hit: {
      body: []
    },
    Idle: {
      body: []
    },
    Jump: {
      body: []
    },
    Run: {
      body: []
    }
  },
  'Pig Throwing a Box': {
    Idle: {
      body: []
    },
    'Picking Box': {
      body: []
    },
    Run: {
      body: []
    },
    'Throwing Box': {
      body: []
    }
  },
  'Pig Thowing a Bomb': {
    Idle: {
      body: []
    },
    'Picking Bomb': {
      body: []
    },
    Run: {
      body: []
    },
    'Throwing Boom': {
      body: []
    }
  },
  'Pig Hide in the Box': {
    Fall: {
      body: []
    },
    Ground: {
      body: []
    },
    Jump: {
      body: []
    },
    'Jump Anticipation': {
      body: []
    },
    'Looking Out': {
      body: []
    }
  },
  'Pig With a Match': {
    'Lighting the Cannon': {
      body: []
    },
    'Lighting the Match': {
      body: []
    },
    'Match On': {
      body: []
    }
  },
  Box: {
    'Box Pieces 1': {
      body: []
    },
    'Box Pieces 2': {
      body: []
    },
    'Box Pieces 3': {
      body: []
    },
    'Box Pieces 4': {
      body: []
    },
    Hit: {
      body: []
    },
    Idle: {
      body: []
    }
  },
  Bomb: {
    'Bomb Off': {
      body: []
    },
    'Bomb On': {
      body: []
    },
    Boooooom: {
      body: []
    }
  },
  Cannon: {
    'Cannon Ball': {
      body: []
    },
    Idle: {
      body: []
    },
    Shoot: {
      body: []
    }
  },
  Door: {
    Closiong: {
      body: []
    },
    Idle: {
      body: []
    },
    Opening: {
      body: []
    }
  }
}