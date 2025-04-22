import events from '../data/events';
import talents from '../data/talents';

/**
 * Life Simulator class that handles the core game logic
 */
class LifeSimulator {
  constructor() {
    // Initialize life attributes
    this.attributes = {
      age: 0,
      health: 5,
      intelligence: 5,
      charm: 5,
      wealth: 5,
      happiness: 5,
      stress: 5,
      family: 5,
      study: 5,
      career: 0,
      relationship: 0,
      marriage: 0,
      children: 0,
      luck: 5,
      willpower: 5,
      creativity: 5,
      independence: 5,
      talent: 5
    };

    // Life stages
    this.stages = {
      childhood: { min: 0, max: 10 },
      adolescence: { min: 10, max: 18 },
      adulthood: { min: 18, max: 65 },
      oldAge: { min: 65, max: 100 }
    };

    // Game state
    this.selectedTalents = [];
    this.lifeEvents = [];
    this.currentEvent = null;
    this.isGameOver = false;
    this.talentPoints = 10;
    this.summary = [];
  }

  /**
   * Reset the game to initial state
   */
  reset() {
    this.attributes = {
      age: 0,
      health: 5,
      intelligence: 5,
      charm: 5,
      wealth: 5,
      happiness: 5,
      stress: 5,
      family: 5,
      study: 5,
      career: 0,
      relationship: 0,
      marriage: 0,
      children: 0,
      luck: 5,
      willpower: 5,
      creativity: 5,
      independence: 5,
      talent: 5
    };
    
    this.selectedTalents = [];
    this.lifeEvents = [];
    this.currentEvent = null;
    this.isGameOver = false;
    this.talentPoints = 10;
    this.summary = [];
  }

  /**
   * Get current life stage based on age
   */
  getCurrentStage() {
    const age = this.attributes.age;
    
    if (age >= this.stages.oldAge.min) return 'oldAge';
    if (age >= this.stages.adulthood.min) return 'adulthood';
    if (age >= this.stages.adolescence.min) return 'adolescence';
    return 'childhood';
  }

  /**
   * Select a talent
   * @param {string} talentId - ID of the talent to select
   * @returns {boolean} - Whether the talent was successfully selected
   */
  selectTalent(talentId) {
    const talent = talents.find(t => t.id === talentId);
    
    if (!talent) return false;
    if (this.talentPoints < talent.cost) return false;
    if (this.selectedTalents.some(t => t.id === talentId)) return false;
    
    this.selectedTalents.push(talent);
    this.talentPoints -= talent.cost;
    
    // Apply talent effects
    this.applyEffects(talent.effects);
    
    return true;
  }

  /**
   * Remove a selected talent
   * @param {string} talentId - ID of the talent to remove
   * @returns {boolean} - Whether the talent was successfully removed
   */
  removeTalent(talentId) {
    const talentIndex = this.selectedTalents.findIndex(t => t.id === talentId);
    
    if (talentIndex === -1) return false;
    
    const talent = this.selectedTalents[talentIndex];
    this.selectedTalents.splice(talentIndex, 1);
    this.talentPoints += talent.cost;
    
    // Revert talent effects
    this.revertEffects(talent.effects);
    
    return true;
  }

  /**
   * Apply attribute effects
   * @param {Object} effects - Effects to apply
   */
  applyEffects(effects) {
    for (const [attribute, value] of Object.entries(effects)) {
      if (typeof value === 'object') {
        // Handle random range effects
        const min = value.min || 0;
        const max = value.max || 0;
        this.attributes[attribute] += Math.floor(Math.random() * (max - min + 1)) + min;
      } else {
        // Handle fixed value effects
        this.attributes[attribute] += value;
      }
      
      // Ensure attributes stay within valid range (0-10 for most)
      if (attribute !== 'age' && attribute !== 'marriage' && 
          attribute !== 'children' && attribute !== 'relationship') {
        this.attributes[attribute] = Math.max(0, Math.min(10, this.attributes[attribute]));
      }
    }
  }

  /**
   * Revert attribute effects
   * @param {Object} effects - Effects to revert
   */
  revertEffects(effects) {
    for (const [attribute, value] of Object.entries(effects)) {
      if (typeof value === 'object') {
        // For random effects, we can't know the exact value that was applied
        // So we use the minimum value as a conservative estimate
        this.attributes[attribute] -= value.min || 0;
      } else {
        this.attributes[attribute] -= value;
      }
      
      // Ensure attributes stay within valid range
      if (attribute !== 'age' && attribute !== 'marriage' && 
          attribute !== 'children' && attribute !== 'relationship') {
        this.attributes[attribute] = Math.max(0, Math.min(10, this.attributes[attribute]));
      }
    }
  }

  /**
   * Check if an event's requirements are met
   * @param {Object} requirements - Event requirements
   * @returns {boolean} - Whether requirements are met
   */
  checkRequirements(requirements) {
    for (const [attribute, condition] of Object.entries(requirements)) {
      const value = this.attributes[attribute];
      
      if (condition.min !== undefined && value < condition.min) return false;
      if (condition.max !== undefined && value > condition.max) return false;
      if (condition.equal !== undefined && value !== condition.equal) return false;
    }
    
    return true;
  }

  /**
   * Get eligible events for the current life stage
   * @returns {Array} - Array of eligible events
   */
  getEligibleEvents() {
    const currentStage = this.getCurrentStage();
    
    return events.filter(event => {
      // Check if event is for current life stage
      if (event.stage !== currentStage) return false;
      
      // Check if event requirements are met
      if (event.requirements && !this.checkRequirements(event.requirements)) return false;
      
      // Check if event has already occurred
      if (this.lifeEvents.some(e => e.id === event.id)) return false;
      
      return true;
    });
  }

  /**
   * Generate a random event based on probabilities
   * @returns {Object|null} - Selected event or null if no eligible events
   */
  generateRandomEvent() {
    const eligibleEvents = this.getEligibleEvents();
    
    if (eligibleEvents.length === 0) return null;
    
    // Calculate total probability
    const totalProbability = eligibleEvents.reduce((sum, event) => sum + (event.probability || 0.1), 0);
    
    // Generate random value
    let random = Math.random() * totalProbability;
    
    // Select event based on probability
    for (const event of eligibleEvents) {
      random -= (event.probability || 0.1);
      if (random <= 0) return event;
    }
    
    // Fallback to random selection
    return eligibleEvents[Math.floor(Math.random() * eligibleEvents.length)];
  }

  /**
   * Advance life by one year
   * @returns {Object} - Current game state
   */
  advanceYear() {
    // Increase age
    this.attributes.age += 1;
    
    // Check if game is over
    if (this.attributes.age >= 80 || this.attributes.health <= 0) {
      this.isGameOver = true;
      return this.getGameState();
    }
    
    // Generate random event
    const event = this.generateRandomEvent();
    
    if (event) {
      this.currentEvent = event;
      
      // If no choices, automatically apply effects
      if (!event.choices || event.choices.length === 0) {
        this.applyEffects(event.effects);
        this.lifeEvents.push({
          ...event,
          age: this.attributes.age
        });
        
        // Add to summary
        this.summary.push({
          age: this.attributes.age,
          event: event.name,
          description: event.description
        });
      }
    } else {
      this.currentEvent = null;
    }
    
    return this.getGameState();
  }

  /**
   * Make a choice for the current event
   * @param {number} choiceIndex - Index of the chosen option
   * @returns {Object} - Current game state
   */
  makeChoice(choiceIndex) {
    if (!this.currentEvent || !this.currentEvent.choices) return this.getGameState();
    
    const choice = this.currentEvent.choices[choiceIndex];
    
    if (!choice) return this.getGameState();
    
    // Apply base event effects
    this.applyEffects(this.currentEvent.effects);
    
    // Apply choice-specific effects
    this.applyEffects(choice.effects);
    
    // Record the event and choice
    this.lifeEvents.push({
      ...this.currentEvent,
      choiceMade: choice.text,
      age: this.attributes.age
    });
    
    // Add to summary
    this.summary.push({
      age: this.attributes.age,
      event: this.currentEvent.name,
      description: this.currentEvent.description,
      choice: choice.text
    });
    
    // Clear current event
    this.currentEvent = null;
    
    return this.getGameState();
  }

  /**
   * Get current game state
   * @returns {Object} - Current game state
   */
  getGameState() {
    return {
      attributes: { ...this.attributes },
      currentStage: this.getCurrentStage(),
      currentEvent: this.currentEvent,
      selectedTalents: [...this.selectedTalents],
      lifeEvents: [...this.lifeEvents],
      isGameOver: this.isGameOver,
      talentPoints: this.talentPoints,
      summary: [...this.summary]
    };
  }

  /**
   * Get life summary
   * @returns {Object} - Life summary
   */
  getLifeSummary() {
    // Calculate life score
    const score = this.calculateLifeScore();
    
    return {
      age: this.attributes.age,
      events: this.summary,
      attributes: { ...this.attributes },
      talents: [...this.selectedTalents],
      score: score
    };
  }

  /**
   * Calculate life score based on attributes
   * @returns {number} - Life score
   */
  calculateLifeScore() {
    // Weight different attributes
    const weights = {
      health: 1,
      intelligence: 1,
      charm: 1,
      wealth: 1,
      happiness: 2,
      family: 1.5,
      career: 1,
      children: 0.5
    };
    
    let score = 0;
    
    // Calculate weighted score
    for (const [attribute, weight] of Object.entries(weights)) {
      score += (this.attributes[attribute] || 0) * weight;
    }
    
    // Bonus for longevity
    score += this.attributes.age * 0.5;
    
    return Math.round(score);
  }
}

export default LifeSimulator;
