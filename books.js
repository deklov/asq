// Anton's Story Quest — book content.
// Each book has chapters. Each chapter has a short text (one screen of reading)
// and 2 multiple-choice questions. The first answer in `choices` is the correct
// one; the app shuffles them before showing.

const BOOKS = [
  {
    id: "dinosaurs",
    title: "Dinosaur Days",
    emoji: "🦖",
    color: "#4caf50",
    chapters: [
      {
        title: "What Were Dinosaurs?",
        text: `Long, long ago, before there were any people, dinosaurs lived on Earth. The first dinosaurs lived more than 200 million years ago!

Dinosaurs were reptiles, like lizards and crocodiles. Some dinosaurs were huge. Some were as small as a chicken.

Nobody has ever seen a dinosaur walk around. So how do we know about them? We find their bones in the ground. Old bones that have turned to stone are called fossils. Scientists who dig up fossils are called paleontologists.`,
        questions: [
          { q: "What do we call old bones that have turned to stone?", choices: ["Fossils", "Pebbles", "Crystals"] },
          { q: "Some dinosaurs were as small as a…", choices: ["Chicken", "Mouse", "Ant"] },
        ],
      },
      {
        title: "The King of the Dinosaurs",
        text: `Tyrannosaurus rex is one of the most famous dinosaurs. Its name means "tyrant lizard king." Most people just call it T. rex.

T. rex was as long as a school bus. It had a giant head and very strong jaws. Its teeth were as big as bananas!

T. rex ate meat. It walked on two strong legs. But its arms were very short, and each hand had only two fingers. Scientists still wonder what T. rex used its tiny arms for.`,
        questions: [
          { q: "How long was a T. rex?", choices: ["As long as a school bus", "As long as a pencil", "As long as a football field"] },
          { q: "How many fingers did T. rex have on each hand?", choices: ["Two", "Five", "Ten"] },
        ],
      },
      {
        title: "Three Horns",
        text: `Triceratops had a big, bony frill around its neck. It also had three horns on its face. That is how it got its name. Triceratops means "three-horned face."

Triceratops did not eat meat. It ate plants. It had a sharp beak, like a parrot, to snip off leaves and twigs.

Triceratops lived at the same time as T. rex. If a hungry T. rex came close, Triceratops could point its sharp horns at it. Stay away!`,
        questions: [
          { q: "What does the name Triceratops mean?", choices: ["Three-horned face", "Big strong tail", "Fast runner"] },
          { q: "What did Triceratops eat?", choices: ["Plants", "Meat", "Fish"] },
        ],
      },
      {
        title: "The Long Necks",
        text: `Some of the biggest animals that ever lived were dinosaurs with very long necks and long tails. They walked on four thick legs, like tree trunks.

Brachiosaurus was one of them. Its front legs were longer than its back legs. With its long neck, it could reach leaves at the very top of tall trees. Its head was higher than a four-story house!

Long-necked dinosaurs ate plants all day long. They had to eat a lot to fill up their giant bodies.`,
        questions: [
          { q: "Why did Brachiosaurus have a long neck?", choices: ["To reach leaves at the top of trees", "To catch fish", "To see over mountains"] },
          { q: "How many legs did the long-necked dinosaurs walk on?", choices: ["Four", "Two", "Six"] },
        ],
      },
      {
        title: "Where Did They Go?",
        text: `About 66 million years ago, something terrible happened. A giant rock from space, as big as a city, crashed into the Earth.

The crash made huge fires and threw dust high into the sky. The dust blocked the sunlight. It got dark and cold, and many plants died. Without food, the big dinosaurs died out.

But not all of them! Some small dinosaurs with feathers lived on. Today we call them birds. So the next time you see a bird, say hello to a real dinosaur!`,
        questions: [
          { q: "What crashed into the Earth 66 million years ago?", choices: ["A giant rock from space", "A huge wave", "A big airplane"] },
          { q: "Which animals today are related to the dinosaurs?", choices: ["Birds", "Cats", "Fish"] },
        ],
      },
    ],
  },

  {
    id: "trains",
    title: "All Aboard! Trains",
    emoji: "🚂",
    color: "#e53935",
    chapters: [
      {
        title: "Steam Trains",
        text: `About 200 years ago, people built the first trains that could carry passengers. These trains were pulled by steam engines.

A steam engine burned coal to make a big fire. The fire made water very hot, until it turned into steam. The steam pushed on parts of the engine, and those parts made the wheels turn.

Steam trains were loud! They went "chuff, chuff, chuff," and white clouds of steam puffed out of the chimney.`,
        questions: [
          { q: "What did a steam engine burn to make its fire?", choices: ["Coal", "Paper", "Ice"] },
          { q: "What did the hot water turn into?", choices: ["Steam", "Juice", "Sand"] },
        ],
      },
      {
        title: "Parts of a Train",
        text: `The front of a train is called the locomotive. It has the engine, and it pulls all the other cars. The train driver sits in the locomotive.

Behind the locomotive come the cars. Some cars have seats for people. Other cars carry things, like wood, oil, or new automobiles.

Trains roll on two long metal rails. The rails are held in place by strong beams lying across the ground. Train wheels have a rim on the inside, so they stay on the rails.`,
        questions: [
          { q: "What is the front of the train called?", choices: ["The locomotive", "The caboose", "The bridge"] },
          { q: "What do trains roll on?", choices: ["Two metal rails", "A rope", "Big balloons"] },
        ],
      },
      {
        title: "The Bullet Train",
        text: `In Japan there are very fast trains called Shinkansen. People also call them bullet trains, because their long, pointy noses look a bit like a bullet.

Bullet trains can go about 300 kilometers per hour. That is faster than a race car!

One bullet train used to make a loud BOOM when it came out of a tunnel. An engineer who loved birds had an idea. He gave the train a long nose, shaped like the beak of a kingfisher bird. A kingfisher dives into water with hardly a splash. The new nose made the train much quieter!`,
        questions: [
          { q: "In which country are the Shinkansen trains?", choices: ["Japan", "Brazil", "Egypt"] },
          { q: "The new nose of the train was shaped like the beak of a…", choices: ["Kingfisher bird", "Duck", "Penguin"] },
        ],
      },
      {
        title: "Floating Trains",
        text: `Some trains do not have wheels at all. Instead, they float! These trains are called maglev trains. Maglev is short for "magnetic levitation." Levitation means floating in the air.

Strong magnets lift the train a tiny bit above the track. Other magnets push the train forward.

Because the train does not touch the track, there is very little rubbing to slow it down. That is why maglev trains can go super fast. In China, a maglev train has carried people to the airport at more than 400 kilometers per hour!`,
        questions: [
          { q: "What makes a maglev train float?", choices: ["Magnets", "Balloons", "Wings"] },
          { q: "Why can maglev trains go so fast?", choices: ["They do not touch the track", "They have big wheels", "They burn coal"] },
        ],
      },
      {
        title: "Trains Under the City",
        text: `In big cities, the streets are full of cars and buses. So some cities built trains that go under the ground, in long tunnels. In London it is called the Underground, or the Tube. In New York it is called the Subway.

London built the first underground train more than 150 years ago.

Every day, millions of people ride trains under the city to get to school and work. Above them, cars drive and people walk. They do not even know a train is zooming by under their feet!`,
        questions: [
          { q: "Where do underground trains drive?", choices: ["In tunnels under the ground", "On the roofs of houses", "On the water"] },
          { q: "Which city built the first underground train?", choices: ["London", "Paris", "Tokyo"] },
        ],
      },
    ],
  },

  {
    id: "machines",
    title: "Big Machines at Work",
    emoji: "🚜",
    color: "#f9a825",
    chapters: [
      {
        title: "The Excavator",
        text: `Dig, dig, dig! The excavator is the machine that digs big holes.

An excavator has a long arm. At the end of the arm is a bucket with sharp teeth. The teeth bite into the dirt, and the bucket scoops it up.

The driver sits in a small room called the cab. The cab can spin all the way around, so the excavator can dig on one side and dump the dirt on the other side. Instead of wheels, most excavators have tracks. Tracks are like big metal belts that help the machine roll over mud and rocks.`,
        questions: [
          { q: "What is at the end of the excavator's arm?", choices: ["A bucket with teeth", "A big hammer", "A water hose"] },
          { q: "What is the room where the driver sits called?", choices: ["The cab", "The kitchen", "The garage"] },
        ],
      },
      {
        title: "The Bulldozer",
        text: `A bulldozer is very strong. It has a giant metal blade in the front. The bulldozer pushes the blade forward, and it shoves dirt, rocks, and sand out of the way.

Bulldozers are used to make the ground flat before people build a road or a house.

Bulldozers are very heavy. If they had wheels, they might sink into soft mud. So bulldozers drive on tracks. The wide tracks spread out the weight, just like snowshoes help you walk on snow without sinking.`,
        questions: [
          { q: "What does a bulldozer have in the front?", choices: ["A giant metal blade", "A long ladder", "A big bucket of paint"] },
          { q: "Why do bulldozers have tracks?", choices: ["So they do not sink into soft mud", "So they can fly", "So they can swim"] },
        ],
      },
      {
        title: "The Dump Truck",
        text: `When the excavator has dug up a lot of dirt, where does it go? Into a dump truck!

A dump truck has a big open box in the back. When the truck gets to the right place, the box tips up high. Whoosh! All the dirt slides out the back.

Some dump trucks are gigantic. They work in mines, where people dig for coal and metal. These trucks are as big as a house. Their tires are much taller than a grown-up! The driver has to climb up a long stairway to get into the cab.`,
        questions: [
          { q: "What happens when the box of the dump truck tips up?", choices: ["The dirt slides out", "The truck flies away", "The tires fall off"] },
          { q: "The tires on the giant mine trucks are taller than…", choices: ["A grown-up", "A house", "A mountain"] },
        ],
      },
      {
        title: "Making a New Road",
        text: `How do people make a new road? First, the bulldozers make the ground flat. Then trucks bring gravel, which is lots of small stones. The gravel makes a strong bottom for the road.

Next comes the paver. The paver spreads out hot, black asphalt on top of the gravel. Asphalt is sticky and smells funny when it is hot.

Then the road roller drives over it. A road roller has heavy, smooth metal drums instead of tires. It squishes the asphalt flat and hard. When the asphalt cools down, the road is ready!`,
        questions: [
          { q: "What does the paver spread on the road?", choices: ["Hot asphalt", "Cold water", "Grass seeds"] },
          { q: "What does the road roller have instead of tires?", choices: ["Heavy metal drums", "Ice skates", "Soft pillows"] },
        ],
      },
      {
        title: "The Crane",
        text: `When builders need to lift something very heavy up high, they use a crane.

A tower crane is so tall that it looks like a giant metal giraffe. It has a long arm called a jib. A strong steel rope hangs from the jib, with a big hook at the end. The crane can lift steel beams, concrete, and even small cars!

The crane driver sits in a tiny cab at the very top. To get there, the driver climbs a long ladder every morning. From up there, the people below look as small as ants.`,
        questions: [
          { q: "What is the long arm of a tower crane called?", choices: ["A jib", "A tail", "A wing"] },
          { q: "How does the crane driver get up to the cab?", choices: ["Climbs a long ladder", "Jumps on a trampoline", "Takes a helicopter"] },
        ],
      },
    ],
  },

  {
    id: "universe",
    title: "Into the Universe",
    emoji: "🚀",
    color: "#3f51b5",
    chapters: [
      {
        title: "Our Star, the Sun",
        text: `The Sun is a star. It is a giant ball of very, very hot gas. It gives us light and keeps us warm. Without the Sun, nothing could live on Earth.

The Sun is huge. About one million Earths could fit inside it!

The Earth travels around the Sun in a big circle. It takes one whole year to go all the way around. So every time you have a birthday, you have traveled once around the Sun!

Never look straight at the Sun. It can hurt your eyes.`,
        questions: [
          { q: "What is the Sun?", choices: ["A star", "A planet", "A moon"] },
          { q: "How long does it take the Earth to go around the Sun?", choices: ["One year", "One day", "One hour"] },
        ],
      },
      {
        title: "The Planets",
        text: `Eight planets travel around the Sun. Together with the Sun, they are called the solar system.

Mercury is the planet closest to the Sun. Then come Venus, Earth, and Mars. Mars is called the red planet, because its dirt is red and rusty.

Jupiter is the biggest planet of all. It has a giant storm that is bigger than the whole Earth! Saturn has beautiful rings made of ice and rock. Far, far away are Uranus and Neptune, which are cold and blue.

Earth is the only planet we know of where plants, animals, and people live.`,
        questions: [
          { q: "Which planet is the biggest?", choices: ["Jupiter", "Mars", "Mercury"] },
          { q: "Why is Mars called the red planet?", choices: ["Its dirt is red and rusty", "It is very hot", "It has red rings"] },
        ],
      },
      {
        title: "The Moon",
        text: `The Moon travels around the Earth. It takes about one month to go all the way around.

The Moon does not make its own light. It shines because the Sun lights it up, like a flashlight shining on a ball.

In 1969, an astronaut named Neil Armstrong became the first person to walk on the Moon. There is no air and no wind on the Moon. That means the footprints the astronauts left are probably still there today!`,
        questions: [
          { q: "Who was the first person to walk on the Moon?", choices: ["Neil Armstrong", "Albert Einstein", "Santa Claus"] },
          { q: "Why are the footprints still on the Moon?", choices: ["There is no wind on the Moon", "Someone glued them", "It rains every day"] },
        ],
      },
      {
        title: "Stars and Galaxies",
        text: `On a dark night, you can see lots of stars. Each star is a sun, just like ours! They look tiny because they are very, very far away.

Stars live in big groups called galaxies. Our galaxy is called the Milky Way. It has more stars than anyone could ever count, maybe more than 100 billion!

The stars are so far away that their light takes years to reach us. When you look at a star, you see light that left it a long time ago. Looking at stars is like looking back in time!`,
        questions: [
          { q: "What is the name of our galaxy?", choices: ["The Milky Way", "The Big Spoon", "The Star Road"] },
          { q: "Why do stars look so tiny?", choices: ["They are very far away", "They are as small as marbles", "They are sleeping"] },
        ],
      },
      {
        title: "Living in Space",
        text: `High above the Earth, a big space station flies around and around our planet. Astronauts live and work there for months at a time.

In the space station, everything floats! The astronauts float too. They sleep in sleeping bags tied to the wall, so they do not drift away in the night.

The space station is very fast. It goes all the way around the Earth in about 90 minutes. That means the astronauts can see about 16 sunrises every single day!`,
        questions: [
          { q: "Why do astronauts tie their sleeping bags to the wall?", choices: ["So they do not float away", "So the bags stay warm", "So aliens can't take them"] },
          { q: "How many sunrises can astronauts see in one day?", choices: ["About 16", "Only 1", "About 100"] },
        ],
      },
    ],
  },

  {
    id: "volcanoes",
    title: "Fire Mountains: Volcanoes",
    emoji: "🌋",
    color: "#ff5722",
    chapters: [
      {
        title: "What Is a Volcano?",
        text: `Deep inside the Earth, it is very, very hot. It is so hot that rock melts and turns into a thick, glowing liquid. Melted rock under the ground is called magma.

Sometimes the magma finds a crack and pushes its way up to the top. When it comes out, we call it lava. The place where it comes out is a volcano.

Over many years, the lava cools down and turns into hard rock. Layer after layer, the rock piles up and makes a mountain.`,
        questions: [
          { q: "What is melted rock under the ground called?", choices: ["Magma", "Mud", "Honey"] },
          { q: "What do we call melted rock when it comes out of a volcano?", choices: ["Lava", "Snow", "Sand"] },
        ],
      },
      {
        title: "Eruption!",
        text: `When a volcano erupts, magma rushes up from deep inside the Earth. Some volcanoes erupt with a giant BANG. They shoot rocks and ash high up into the sky. The ash cloud can be so big that airplanes cannot fly.

Other volcanoes erupt more gently. Rivers of orange lava slowly flow down the side of the mountain.

Lava is hotter than an oven. It can be more than 1,000 degrees! It burns everything it touches, but it moves slowly enough that people can walk away from it.`,
        questions: [
          { q: "Why can't airplanes fly near some eruptions?", choices: ["Because of the big ash cloud", "Because of the rain", "Because the birds are in the way"] },
          { q: "Lava is hotter than…", choices: ["An oven", "A cup of tea", "A sunny day"] },
        ],
      },
      {
        title: "The Lost City",
        text: `Almost 2,000 years ago, there was a busy city in Italy called Pompeii. It was close to a volcano called Mount Vesuvius.

One day, Vesuvius erupted. Hot ash and stones rained down on the city. Soon, the whole city was buried under the ash.

For hundreds of years, people forgot that Pompeii was there. Then workers digging in the ground found it again! Today you can walk on the old streets of Pompeii and see the houses, bakeries, and even pictures painted on the walls.`,
        questions: [
          { q: "What was the name of the city that was buried?", choices: ["Pompeii", "London", "Volcano Town"] },
          { q: "What buried the city?", choices: ["Ash and stones from the volcano", "Snow", "Water from the sea"] },
        ],
      },
      {
        title: "Islands of Fire",
        text: `Did you know that volcanoes can make new land? The islands of Hawaii were made by volcanoes under the ocean.

The lava came out at the bottom of the sea. It cooled into rock, and more lava piled on top. After a very long time, the rock pile grew so tall that it poked out of the water. A new island was born!

Volcanoes in Hawaii are still erupting today. When the lava flows into the ocean, the water hisses and bubbles, and the island grows a little bit bigger.`,
        questions: [
          { q: "What made the islands of Hawaii?", choices: ["Volcanoes under the ocean", "Big ships", "Giant sand castles"] },
          { q: "What happens when lava flows into the ocean?", choices: ["The island grows a little bigger", "The ocean turns into juice", "The lava turns into fish"] },
        ],
      },
      {
        title: "Volcano Scientists",
        text: `Scientists who study volcanoes are called volcanologists. That is a long word! Try saying it slowly: vol-can-ol-o-gists.

Volcanologists watch volcanoes very carefully. They measure if the ground is shaking or bulging up. That can mean magma is moving and an eruption is coming. Then they warn the people who live nearby, so they can get to a safe place.

Some volcanologists wear shiny silver suits that keep the heat away. They can get close to the lava to collect samples of it.`,
        questions: [
          { q: "What are volcano scientists called?", choices: ["Volcanologists", "Astronauts", "Paleontologists"] },
          { q: "Why do volcanologists warn people?", choices: ["So they can get to a safe place", "So they can watch the fireworks", "So they can go swimming"] },
        ],
      },
    ],
  },
];
