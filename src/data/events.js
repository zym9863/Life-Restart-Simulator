/**
 * Life events data for the Life Restart Simulator
 * Each event has:
 * - id: unique identifier
 * - name: event name
 * - description: event description
 * - stage: life stage when this event can occur (childhood, adolescence, adulthood, oldAge)
 * - probability: chance of this event occurring (0-1)
 * - requirements: conditions that must be met for this event to occur
 * - effects: how this event affects attributes
 * - choices: possible choices for this event (if any)
 */

const events = [
  // Childhood events (0-10 years)
  {
    id: "c1",
    name: "天赋异禀",
    description: "你似乎比其他孩子更聪明，学东西很快。",
    stage: "childhood",
    probability: 0.1,
    requirements: {
      intelligence: { min: 7 }
    },
    effects: {
      intelligence: 2,
      happiness: 1
    }
  },
  {
    id: "c2",
    name: "体弱多病",
    description: "你的身体比较虚弱，经常生病。",
    stage: "childhood",
    probability: 0.1,
    requirements: {
      health: { max: 4 }
    },
    effects: {
      health: -1,
      happiness: -1
    }
  },
  {
    id: "c3",
    name: "快乐童年",
    description: "你有一个幸福的童年，父母很关心你。",
    stage: "childhood",
    probability: 0.3,
    requirements: {
      family: { min: 6 }
    },
    effects: {
      happiness: 2,
      charm: 1
    }
  },
  {
    id: "c4",
    name: "早期教育",
    description: "父母很重视你的教育，送你去了好学校。",
    stage: "childhood",
    probability: 0.2,
    requirements: {
      family: { min: 5 },
      wealth: { min: 5 }
    },
    effects: {
      intelligence: 2,
      stress: 1
    }
  },

  // Adolescence events (10-18 years)
  {
    id: "a1",
    name: "学业优秀",
    description: "你在学校表现出色，成绩名列前茅。",
    stage: "adolescence",
    probability: 0.2,
    requirements: {
      intelligence: { min: 7 }
    },
    effects: {
      intelligence: 1,
      happiness: 1,
      stress: 1
    }
  },
  {
    id: "a2",
    name: "叛逆期",
    description: "你进入了叛逆期，与父母关系紧张。",
    stage: "adolescence",
    probability: 0.3,
    requirements: {},
    effects: {
      family: -2,
      stress: 2
    },
    choices: [
      {
        text: "尝试理解父母",
        effects: {
          family: 1,
          intelligence: 1
        }
      },
      {
        text: "坚持自我",
        effects: {
          family: -1,
          independence: 2
        }
      }
    ]
  },
  {
    id: "a3",
    name: "早恋",
    description: "你陷入了青春期的懵懂爱情。",
    stage: "adolescence",
    probability: 0.2,
    requirements: {
      charm: { min: 6 }
    },
    effects: {
      happiness: 2,
      stress: 1,
      study: -1
    },
    choices: [
      {
        text: "专注学业，结束这段感情",
        effects: {
          intelligence: 1,
          happiness: -1
        }
      },
      {
        text: "珍惜这段感情",
        effects: {
          happiness: 1,
          study: -1,
          charm: 1
        }
      }
    ]
  },
  {
    id: "a4",
    name: "发现兴趣爱好",
    description: "你发现了自己真正热爱的事物。",
    stage: "adolescence",
    probability: 0.3,
    requirements: {},
    effects: {
      happiness: 2,
      talent: 1
    }
  },

  // Adulthood events (18-65 years)
  {
    id: "ad1",
    name: "大学录取",
    description: "你被大学录取了。",
    stage: "adulthood",
    probability: 0.4,
    requirements: {
      intelligence: { min: 6 },
      study: { min: 5 }
    },
    effects: {
      intelligence: 2,
      career: 2,
      stress: 1
    },
    choices: [
      {
        text: "选择名校但压力大的专业",
        effects: {
          intelligence: 3,
          stress: 3,
          career: 3
        }
      },
      {
        text: "选择轻松但前景一般的专业",
        effects: {
          happiness: 2,
          stress: -1,
          career: 1
        }
      }
    ]
  },
  {
    id: "ad2",
    name: "事业起步",
    description: "你开始了自己的职业生涯。",
    stage: "adulthood",
    probability: 0.5,
    requirements: {
      age: { min: 22 }
    },
    effects: {
      wealth: 2,
      stress: 2
    },
    choices: [
      {
        text: "选择稳定的工作",
        effects: {
          wealth: 1,
          stress: -1
        }
      },
      {
        text: "创业",
        effects: {
          wealth: { min: -2, max: 5 },
          stress: 3
        }
      }
    ]
  },
  {
    id: "ad3",
    name: "遇到生命中的另一半",
    description: "你遇到了可能与你共度一生的人。",
    stage: "adulthood",
    probability: 0.3,
    requirements: {
      charm: { min: 4 },
      age: { min: 20 }
    },
    effects: {
      happiness: 3,
      stress: -1
    },
    choices: [
      {
        text: "全力投入这段感情",
        effects: {
          happiness: 2,
          career: -1
        }
      },
      {
        text: "保持距离，专注事业",
        effects: {
          career: 2,
          happiness: -1
        }
      }
    ]
  },
  {
    id: "ad4",
    name: "结婚",
    description: "你决定步入婚姻。",
    stage: "adulthood",
    probability: 0.3,
    requirements: {
      age: { min: 25 },
      relationship: { min: 1 }
    },
    effects: {
      happiness: 3,
      wealth: -2,
      stress: 1
    }
  },
  {
    id: "ad5",
    name: "生子",
    description: "你有了自己的孩子。",
    stage: "adulthood",
    probability: 0.3,
    requirements: {
      marriage: { min: 1 },
      age: { min: 25 }
    },
    effects: {
      happiness: 3,
      wealth: -3,
      stress: 3
    }
  },
  {
    id: "ad6",
    name: "职业危机",
    description: "你在职业生涯中遇到了瓶颈。",
    stage: "adulthood",
    probability: 0.3,
    requirements: {
      career: { min: 1 },
      age: { min: 30 }
    },
    effects: {
      stress: 3,
      happiness: -2
    },
    choices: [
      {
        text: "转行",
        effects: {
          career: { min: -2, max: 3 },
          stress: 2
        }
      },
      {
        text: "坚持当前职业",
        effects: {
          career: 1,
          stress: 1
        }
      }
    ]
  },
  {
    id: "ad7",
    name: "事业有成",
    description: "你的职业生涯达到了一个高峰。",
    stage: "adulthood",
    probability: 0.2,
    requirements: {
      career: { min: 7 },
      age: { min: 35 }
    },
    effects: {
      wealth: 5,
      happiness: 3,
      stress: -1
    }
  },

  // Old Age events (65+ years)
  {
    id: "o1",
    name: "退休",
    description: "你结束了职业生涯，开始了退休生活。",
    stage: "oldAge",
    probability: 0.8,
    requirements: {
      age: { min: 60 }
    },
    effects: {
      stress: -3,
      wealth: -1,
      happiness: { min: -2, max: 3 }
    },
    choices: [
      {
        text: "安享晚年",
        effects: {
          happiness: 2,
          health: 1
        }
      },
      {
        text: "继续保持活跃",
        effects: {
          happiness: 1,
          health: 2,
          wealth: 1
        }
      }
    ]
  },
  {
    id: "o2",
    name: "健康问题",
    description: "你开始面临各种健康问题。",
    stage: "oldAge",
    probability: 0.5,
    requirements: {
      age: { min: 70 }
    },
    effects: {
      health: -3,
      happiness: -2,
      wealth: -2
    }
  },
  {
    id: "o3",
    name: "含饴弄孙",
    description: "你的子女给你带来了可爱的孙辈。",
    stage: "oldAge",
    probability: 0.4,
    requirements: {
      children: { min: 1 },
      age: { min: 55 }
    },
    effects: {
      happiness: 3,
      health: 1
    }
  },
  {
    id: "o4",
    name: "回顾一生",
    description: "在晚年，你开始回顾自己的一生。",
    stage: "oldAge",
    probability: 0.7,
    requirements: {
      age: { min: 75 }
    },
    effects: {
      happiness: { min: -3, max: 3 }
    }
  }
];

export default events;
