import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'dashboard',
    imports: [],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

    
    private _documents = [
        "The quick brown fox jumps over the lazy dog. It was a sunny day, and the animals were enjoying the weather. The fox was particularly energetic, running around and chasing butterflies in the field.",
        "In a small town, there lived a baker known for his delicious bread. Every morning, the smell of freshly baked goods filled the streets. People lined up eagerly to buy their favorite treats.",
        "Once upon a time, there was a magical forest where every tree glowed in the dark. Creatures of all kinds lived in harmony, and they thrived under the mysterious light of the glowing trees.",
        "Technology has advanced rapidly in recent years. From smartphones to self-driving cars, innovation is everywhere. People are finding new ways to connect and improve their lives daily.",
        "The mountain trail was steep and challenging. Hikers came from far and wide to test their endurance. At the summit, the breathtaking view made the climb worth every step.",
        "In the heart of the bustling city, there was a small cafe hidden in an alley. The aroma of coffee and pastries lured in curious visitors. Regulars loved the cozy atmosphere and friendly staff.",
        "The old library stood at the edge of the village. Dusty shelves were filled with ancient books and forgotten stories. Adventurous readers often found unexpected treasures among the pages.",
        "On a stormy night, a ship sailed through rough seas. The crew worked tirelessly to navigate the raging waters. Despite the challenges, their spirits remained high, driven by hope and courage.",
        "Deep in the jungle, explorers discovered a hidden temple. The walls were covered in intricate carvings, telling stories of a lost civilization. The air was thick with mystery and excitement.",
        "Autumn leaves painted the park in vibrant colors. Families gathered for picnics, and children played on the swings. The crisp air carried the scent of cinnamon and pumpkin spice.",
        "A scientist in a quiet lab made a groundbreaking discovery. Years of hard work and dedication had finally paid off. The invention promised to change the world for the better.",
        "At the beach, the waves crashed against the shore. Surfers paddled out to catch the perfect wave, while beachgoers built sandcastles. The sun set, painting the sky in hues of orange and pink.",
        "A young artist painted murals on the walls of her neighborhood. Each piece told a unique story, reflecting the community's culture and history. Her work brought people together in celebration of art.",
        "In the desert, the sun blazed down on the golden sands. Travelers rode camels, searching for an oasis. The endless dunes stretched far into the horizon, creating a mesmerizing landscape.",
        "The orchestra performed a symphony that captivated the audience. Musicians played with passion and precision, creating a magical atmosphere. The crowd erupted into applause at the grand finale.",
        "A small startup developed an app that simplified daily tasks. Users praised its intuitive design and practicality. The team celebrated their success, motivated to innovate further.",
        "During the festival, the streets were alive with music and dance. Food stalls offered delicious local dishes, and people celebrated with joy. The night sky lit up with fireworks, ending the event spectacularly.",
        "In a quaint village, an old man told stories by the fire. His tales of adventure and wisdom fascinated young listeners. They dreamed of embarking on journeys just like the ones he described.",
        "The garden was a haven for butterflies and bees. Flowers of every color bloomed, filling the air with fragrance. Visitors found peace and inspiration in the serene environment.",
        "A family road trip brought laughter and unforgettable memories. They explored new places, tasted different cuisines, and bonded over shared experiences. The journey was as cherished as the destination.",
        "The quick brown fox jumps over the lazy dog. It was a sunny day, and the animals were enjoying the weather. The fox was particularly energetic, running around and chasing butterflies in the field.",
        "In a small town, there lived a baker known for his delicious bread. Every morning, the smell of freshly baked goods filled the streets. People lined up eagerly to buy their favorite treats.",
        "Once upon a time, there was a magical forest where every tree glowed in the dark. Creatures of all kinds lived in harmony, and they thrived under the mysterious light of the glowing trees.",
        "Technology has advanced rapidly in recent years. From smartphones to self-driving cars, innovation is everywhere. People are finding new ways to connect and improve their lives daily.",
        "The mountain trail was steep and challenging. Hikers came from far and wide to test their endurance. At the summit, the breathtaking view made the climb worth every step.",
        "In the heart of the bustling city, there was a small cafe hidden in an alley. The aroma of coffee and pastries lured in curious visitors. Regulars loved the cozy atmosphere and friendly staff.",
        "The old library stood at the edge of the village. Dusty shelves were filled with ancient books and forgotten stories. Adventurous readers often found unexpected treasures among the pages.",
        "On a stormy night, a ship sailed through rough seas. The crew worked tirelessly to navigate the raging waters. Despite the challenges, their spirits remained high, driven by hope and courage.",
        "Deep in the jungle, explorers discovered a hidden temple. The walls were covered in intricate carvings, telling stories of a lost civilization. The air was thick with mystery and excitement.",
        "Autumn leaves painted the park in vibrant colors. Families gathered for picnics, and children played on the swings. The crisp air carried the scent of cinnamon and pumpkin spice.",
        "A scientist in a quiet lab made a groundbreaking discovery. Years of hard work and dedication had finally paid off. The invention promised to change the world for the better.",
        "At the beach, the waves crashed against the shore. Surfers paddled out to catch the perfect wave, while beachgoers built sandcastles. The sun set, painting the sky in hues of orange and pink.",
        "A young artist painted murals on the walls of her neighborhood. Each piece told a unique story, reflecting the community's culture and history. Her work brought people together in celebration of art.",
        "In the desert, the sun blazed down on the golden sands. Travelers rode camels, searching for an oasis. The endless dunes stretched far into the horizon, creating a mesmerizing landscape.",
        "The orchestra performed a symphony that captivated the audience. Musicians played with passion and precision, creating a magical atmosphere. The crowd erupted into applause at the grand finale.",
        "A small startup developed an app that simplified daily tasks. Users praised its intuitive design and practicality. The team celebrated their success, motivated to innovate further.",
        "During the festival, the streets were alive with music and dance. Food stalls offered delicious local dishes, and people celebrated with joy. The night sky lit up with fireworks, ending the event spectacularly.",
        "In a quaint village, an old man told stories by the fire. His tales of adventure and wisdom fascinated young listeners. They dreamed of embarking on journeys just like the ones he described.",
        "The garden was a haven for butterflies and bees. Flowers of every color bloomed, filling the air with fragrance. Visitors found peace and inspiration in the serene environment.",
        "A family road trip brought laughter and unforgettable memories. They explored new places, tasted different cuisines, and bonded over shared experiences. The journey was as cherished as the destination."
    ];

    testDocs(){
        const docs:any[] = [];
        for (let i = 0; i < this._documents.length; i++){
            docs.push({
                id: i,
                text: this._documents[i]
            })
        }
        return docs;


    }

    displayDocText(text:string, n:number){
        return text.slice(0,n) + ' [...]'
    }
}   