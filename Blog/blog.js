const articles = [
	{
		id: 1,
		title: 'Septimus Heap Book One: Magyk',
		date: 'July 5, 2022',
		description:
			'If you enjoy stories about seventh sons of seventh sons and magyk this is the book for you.',
		imgSrc: 'https://upload.wikimedia.org/wikipedia/en/5/5f/Magkycover2.jpg',
		imgAlt: 'Book cover for Septimus Heap 1',
		ages: '10-14',
		genre: 'Fantasy',
		stars: '★★★★' // Changed from '****' to star characters for consistency
	},
	{
		id: 2,
		title: 'Magnus Chase Book One: Sword of Summer',
		date: 'December 12, 2021',
		description:
			'The anticipated new novel by Rick Riordan. After Greek mythology (Percy Jackson), Greek/Roman (Heroes of Olympus), and Egyptian (Kane Chronicles), Rick decides to try his hand with Norse Mythology, and the end result is good.',
		imgSrc:
			'https://books.google.com/books/content/images/frontcover/xWuyBAAAQBAJ?fife=w300',
		imgAlt: 'Book cover for Magnus Chase 1',
		ages: '12-16',
		genre: 'Fantasy',
		stars: '⭐⭐⭐⭐'
	},
	{
		title: "The Dragon's Return",
		date: "May 31, 2025",
		author: "John Doe",
		genre: "Fantasy",
		pages: 320,
		summary: "An epic tale of fire, flight, and forgotten kingdoms...",
		cover: "dragon-book.jpg"
	},
	{
		title: "Mystery of the Moonlight",
		date: "June 2, 2025",
		author: "Jane Smith",
		genre: "Mystery",
		pages: 280,
		summary: "A thrilling nighttime investigation into the unknown...",
		cover: "moonlight-book.jpg"
	}
];

const postsContainer = document.querySelector("#posts");

// Function to create one article
function createArticle(post) {
  const article = document.createElement("article");
  article.classList.add("post");

  article.innerHTML = `
    <div class="details">
      <p class="date">${post.date}</p>
      <ul class="meta">
        <li>Author: ${post.author}</li>
        <li>Genre: ${post.genre}</li>
        <li>Pages: ${post.pages}</li>
      </ul>
    </div>
    <div class="content">
      <h2 class="title">${post.title}</h2>
      <img src="${post.cover}" alt="Book cover of ${post.title}" class="bookcover">
      <p class="summary">${post.summary}</p>
    </div>
  `;

  postsContainer.appendChild(article);
}

// Loop through all articles and create them
articles.forEach(createArticle);