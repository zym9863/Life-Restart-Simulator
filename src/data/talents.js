/**
 * Talents data for the Life Restart Simulator
 * Each talent has:
 * - id: unique identifier
 * - name: talent name
 * - description: talent description
 * - effects: how this talent affects attributes
 * - cost: talent point cost
 */

const talents = [
  {
    id: "t1",
    name: "天生聪慧",
    description: "你天生就比他人更聪明。",
    effects: {
      intelligence: 3
    },
    cost: 3
  },
  {
    id: "t2",
    name: "健康体魄",
    description: "你拥有强健的体魄，很少生病。",
    effects: {
      health: 3
    },
    cost: 3
  },
  {
    id: "t3",
    name: "魅力非凡",
    description: "你天生就有着不可抗拒的魅力。",
    effects: {
      charm: 3
    },
    cost: 3
  },
  {
    id: "t4",
    name: "富裕家庭",
    description: "你出生在一个富裕的家庭。",
    effects: {
      wealth: 3,
      family: 1
    },
    cost: 4
  },
  {
    id: "t5",
    name: "幸福家庭",
    description: "你出生在一个幸福和睦的家庭。",
    effects: {
      family: 3,
      happiness: 1
    },
    cost: 3
  },
  {
    id: "t6",
    name: "坚韧不拔",
    description: "你有着超乎常人的毅力。",
    effects: {
      stress: -2,
      willpower: 2
    },
    cost: 3
  },
  {
    id: "t7",
    name: "艺术天赋",
    description: "你在艺术方面有着非凡的天赋。",
    effects: {
      creativity: 3,
      intelligence: 1
    },
    cost: 3
  },
  {
    id: "t8",
    name: "运动天才",
    description: "你在体育运动方面表现出色。",
    effects: {
      health: 2,
      charm: 1,
      happiness: 1
    },
    cost: 3
  },
  {
    id: "t9",
    name: "社交达人",
    description: "你天生就善于与人交往。",
    effects: {
      charm: 2,
      happiness: 1,
      stress: -1
    },
    cost: 3
  },
  {
    id: "t10",
    name: "好运连连",
    description: "你似乎总是比他人更幸运。",
    effects: {
      luck: 3
    },
    cost: 4
  }
];

export default talents;
