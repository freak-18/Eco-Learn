const mongoose = require('mongoose');
const Quiz = require('./models/Quiz');
const Challenge = require('./models/Challenge');
require('dotenv').config();

const sampleQuizzes = [
  {
    title: "Recycling Basics",
    description: "Test your knowledge about recycling and waste management",
    category: "recycling",
    difficulty: "easy",
    timeLimit: 10,
    points: 100,
    questions: [
      {
        question: "Which of these materials can be recycled?",
        options: ["Plastic bottles", "Pizza boxes with grease", "Broken glass", "All of the above"],
        correctAnswer: 0,
        explanation: "Clean plastic bottles are recyclable, but greasy pizza boxes and broken glass require special handling."
      },
      {
        question: "What does the recycling symbol with number 1 mean?",
        options: ["Paper", "PET plastic", "Glass", "Aluminum"],
        correctAnswer: 1,
        explanation: "The number 1 in the recycling symbol indicates PET (Polyethylene Terephthalate) plastic."
      },
      {
        question: "How much energy can recycling one aluminum can save?",
        options: ["Enough to power a TV for 1 hour", "Enough to power a TV for 3 hours", "Enough to power a TV for 6 hours", "No energy savings"],
        correctAnswer: 1,
        explanation: "Recycling one aluminum can saves enough energy to power a television for about 3 hours."
      }
    ]
  },
  {
    title: "Climate Change Fundamentals",
    description: "Understanding the basics of climate change and global warming",
    category: "climate",
    difficulty: "medium",
    timeLimit: 15,
    points: 150,
    questions: [
      {
        question: "What is the main cause of current climate change?",
        options: ["Solar radiation changes", "Human activities", "Natural climate cycles", "Volcanic eruptions"],
        correctAnswer: 1,
        explanation: "Scientific consensus shows that current climate change is primarily caused by human activities, especially greenhouse gas emissions."
      },
      {
        question: "Which greenhouse gas is most abundant in the atmosphere?",
        options: ["Carbon dioxide", "Methane", "Water vapor", "Nitrous oxide"],
        correctAnswer: 2,
        explanation: "Water vapor is the most abundant greenhouse gas, though CO2 is the most significant human-contributed one."
      },
      {
        question: "What is the Paris Agreement's main goal?",
        options: ["Eliminate all emissions by 2030", "Limit global warming to 1.5°C", "Ban fossil fuels globally", "Create a carbon tax"],
        correctAnswer: 1,
        explanation: "The Paris Agreement aims to limit global warming to well below 2°C, preferably to 1.5°C above pre-industrial levels."
      }
    ]
  },
  {
    title: "Water Conservation Expert",
    description: "Advanced strategies for water conservation and management",
    category: "water",
    difficulty: "hard",
    timeLimit: 20,
    points: 200,
    questions: [
      {
        question: "What percentage of Earth's water is freshwater?",
        options: ["10%", "5%", "2.5%", "1%"],
        correctAnswer: 2,
        explanation: "Only about 2.5% of Earth's water is freshwater, and most of that is frozen in ice caps and glaciers."
      },
      {
        question: "Which irrigation method is most water-efficient?",
        options: ["Flood irrigation", "Sprinkler irrigation", "Drip irrigation", "Furrow irrigation"],
        correctAnswer: 2,
        explanation: "Drip irrigation is the most water-efficient method, delivering water directly to plant roots with minimal waste."
      },
      {
        question: "What is greywater?",
        options: ["Polluted river water", "Wastewater from sinks and showers", "Rainwater", "Treated sewage water"],
        correctAnswer: 1,
        explanation: "Greywater is wastewater from bathroom sinks, showers, tubs, and washing machines that can be reused for irrigation."
      }
    ]
  }
];

const sampleChallenges = [
  {
    title: "Plastic-Free Day",
    description: "Go an entire day without using any single-use plastic items",
    category: "waste-reduction",
    difficulty: "medium",
    points: 50,
    timeLimit: 1,
    requiresProof: true,
    isDaily: true,
    instructions: [
      "Bring reusable bags when shopping",
      "Use a refillable water bottle",
      "Avoid packaged foods when possible",
      "Say no to plastic straws and utensils"
    ],
    tips: [
      "Plan ahead by packing reusable alternatives",
      "Choose bulk items or items with minimal packaging",
      "Inform restaurants about your plastic-free goal"
    ]
  },
  {
    title: "Energy Audit at Home",
    description: "Conduct a comprehensive energy audit of your home and identify 5 ways to save energy",
    category: "energy",
    difficulty: "easy",
    points: 75,
    timeLimit: 7,
    requiresProof: true,
    instructions: [
      "Check for air leaks around windows and doors",
      "Examine insulation in attic and basement",
      "Review thermostat settings",
      "Assess lighting efficiency",
      "Evaluate appliance energy usage"
    ],
    tips: [
      "Use a candle or incense to detect air leaks",
      "Check your utility bills for usage patterns",
      "Consider LED bulb replacements"
    ]
  },
  {
    title: "Start a Compost Bin",
    description: "Set up a composting system for organic waste",
    category: "gardening",
    difficulty: "medium",
    points: 100,
    timeLimit: 14,
    requiresProof: true,
    instructions: [
      "Choose a suitable location for your compost bin",
      "Gather brown materials (dry leaves, paper)",
      "Collect green materials (food scraps, grass clippings)",
      "Layer materials properly",
      "Monitor moisture and turn regularly"
    ],
    tips: [
      "Maintain a 3:1 ratio of brown to green materials",
      "Keep compost moist but not soggy",
      "Turn every 2-3 weeks for faster decomposition"
    ]
  },
  {
    title: "Public Transport Challenge",
    description: "Use only public transportation, walking, or cycling for one week",
    category: "transportation",
    difficulty: "hard",
    points: 150,
    timeLimit: 7,
    requiresProof: true,
    instructions: [
      "Plan your routes using public transport apps",
      "Walk or cycle for short distances",
      "Use buses, trains, or subways for longer trips",
      "Track your carbon footprint savings"
    ],
    tips: [
      "Check schedules in advance",
      "Consider getting a weekly transit pass",
      "Combine errands into single trips"
    ]
  },
  {
    title: "Water Conservation Week",
    description: "Implement water-saving measures and reduce your water usage by 20%",
    category: "water",
    difficulty: "medium",
    points: 120,
    timeLimit: 7,
    requiresProof: true,
    instructions: [
      "Take shorter showers (5 minutes or less)",
      "Fix any leaky faucets or toilets",
      "Only run dishwasher and washing machine with full loads",
      "Collect rainwater for plants",
      "Turn off tap while brushing teeth"
    ],
    tips: [
      "Use a timer for showers",
      "Install low-flow showerheads if possible",
      "Water plants early morning or evening"
    ]
  },
  {
    title: "Zero Food Waste Day",
    description: "Plan and prepare meals to avoid any food waste for an entire day",
    category: "waste-reduction",
    difficulty: "easy",
    points: 40,
    timeLimit: 1,
    requiresProof: true,
    isDaily: true,
    instructions: [
      "Plan your meals in advance",
      "Use up leftovers creatively",
      "Store food properly to prevent spoilage",
      "Compost any unavoidable organic waste"
    ],
    tips: [
      "Check your fridge before shopping",
      "Use the 'first in, first out' principle",
      "Repurpose vegetable scraps for broth"
    ]
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Quiz.deleteMany({});
    await Challenge.deleteMany({});
    console.log('Cleared existing data');

    // Insert sample quizzes
    await Quiz.insertMany(sampleQuizzes);
    console.log('Sample quizzes inserted');

    // Insert sample challenges
    await Challenge.insertMany(sampleChallenges);
    console.log('Sample challenges inserted');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();