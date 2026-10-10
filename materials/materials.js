// ======================================================
// STUDY WITH JASMINE
// MATERIAL LIBRARY
// materials/materials.js
// ======================================================


// ======================================================
// 1. SUPABASE
// ======================================================

const SUPABASE_URL =
    "https://eunvkjirdgovwgclqkcm.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_cvGGPzroACteZ2Y5bIYo8w_gUXkqtUV";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


// ======================================================
// 2. GLOBAL DATA
// ======================================================

let allMaterials = [];

let currentSubject = null;
let currentCourse = null;
let currentSearch = "";


// ======================================================
// 3. LOAD MATERIALS
// ======================================================

async function loadMaterials() {

    console.log("Loading materials...");

    const { data, error } = await supabaseClient
        .from("Materials")
        .select("*")
        .eq("is_published", true)
        .order("created_at", {
            ascending: false
        });


    if (error) {

        console.error(
            "Error loading materials:",
            error
        );

        showLoadError();

        return;
    }


    allMaterials = data || [];


    console.log(
        "Materials from Supabase:",
        allMaterials
    );


    // IMPORTANT:
    // Khi vừa mở trang Materials,
    // KHÔNG tự động hiện material.
    clearMaterials();


    setupSubjectButtons();

    setupProgramButtons();

    setupSearch();

}


// ======================================================
// 4. CLEAR MATERIAL AREA
// ======================================================

function clearMaterials() {

    const container =
        document.getElementById(
            "materialsGrid"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";

}


// ======================================================
// 5. ERROR MESSAGE
// ======================================================

function showLoadError() {

    const container =
        document.getElementById(
            "materialsGrid"
        );


    if (!container) {
        return;
    }


    container.innerHTML = `

        <div class="no-materials">

            <h3>
                Unable to load materials.
            </h3>

            <p>
                Please refresh the page
                and try again.
            </p>

        </div>

    `;

}


// ======================================================
// 6. GET COVER IMAGE
// ======================================================

function getCoverUrl(coverPath) {

    if (!coverPath) {
        return "";
    }


    const { data } =
        supabaseClient.storage
            .from("material-covers")
            .getPublicUrl(
                coverPath
            );


    return data.publicUrl;

}


// ======================================================
// 7. DISPLAY MATERIALS
// ======================================================

function displayMaterials(materials) {

    const container =
        document.getElementById(
            "materialsGrid"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    // ------------------------------------------
    // NO MATERIAL
    // ------------------------------------------

    if (!materials || materials.length === 0) {

        container.innerHTML = `

            <div class="no-materials">

                <h3>
                    No materials yet.
                </h3>

                <p>
                    Materials for this section
                    will be added soon.
                </p>

            </div>

        `;

        return;
    }


    // ------------------------------------------
    // CREATE CARDS
    // ------------------------------------------

    materials.forEach(material => {

        const card =
            document.createElement(
                "article"
            );


        card.className =
            "material-card";


        const coverURL =
            getCoverUrl(
                material.cover_path
            );


        const price =
            Number(material.price) === 0
                ? "Free"
                : "$" + Number(material.price).toFixed(2);


        card.innerHTML = `

            ${
                coverURL
                    ? `
                        <img
                            src="${escapeHTML(coverURL)}"
                            alt="${escapeHTML(material.title || "Material")}"
                            class="material-image"
                        >
                    `
                    : `
                        <div class="material-image material-image-placeholder">
                            学
                        </div>
                    `
            }


            <div class="material-card-content">


                <div class="material-tags">

                    ${
                        material.subject
                            ? `
                                <span class="tag">
                                    ${escapeHTML(material.subject)}
                                </span>
                            `
                            : ""
                    }


                    ${
                        material.course
                            ? `
                                <span class="tag">
                                    ${escapeHTML(material.course)}
                                </span>
                            `
                            : ""
                    }

                </div>


                <h3>
                    ${escapeHTML(material.title || "")}
                </h3>


                <p>
                    ${escapeHTML(material.description || "")}
                </p>


                <div class="price-area">


                    <div class="price">
                        ${price}
                    </div>


                    <button
                        type="button"
                        class="material-button"
                        data-id="${material.id}"
                    >
                        View Material
                    </button>


                </div>


            </div>

        `;


        container.appendChild(card);

    });


    setupMaterialButtons();

}


// ======================================================
// 8. MAIN SUBJECT BUTTONS
//
// All
// Chinese
// Vietnamese
// English
// Cambridge Math
// ======================================================

function setupSubjectButtons() {

    const buttons =
        document.querySelectorAll(
            ".category-btn"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const value =
                    button.dataset.course;


                // ----------------------------------
                // ACTIVE BUTTON
                // ----------------------------------

                buttons.forEach(btn => {

                    btn.classList.remove(
                        "active"
                    );

                });


                button.classList.add(
                    "active"
                );


                // ----------------------------------
                // RESET PROGRAM FILTER
                // ----------------------------------

                currentCourse = null;


                // ----------------------------------
                // ALL
                // ----------------------------------

                if (
                    !value ||
                    normalize(value) === "all"
                ) {

                    currentSubject = null;

                }

                else {

                    currentSubject = value;

                }


                applyFilters();

            }
        );

    });

}


// ======================================================
// 9. CHINESE PROGRAM BUTTONS
//
// Business Chinese
// Factory & Workplace Chinese
// Travel & Hospitality Chinese
// YCT Chinese for Kids
// HSK 3.0
//
// Measure Words has its own page.
// ======================================================

function setupProgramButtons() {

    const buttons =
        document.querySelectorAll(
            ".program-card"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            event => {

                const course =
                    button.dataset.course;


                // Measure Words hoặc button
                // không có data-course
                // thì để HTML xử lý link riêng.
                if (!course) {
                    return;
                }


                event.preventDefault();


                currentCourse = course;

                currentSubject = "Chinese";


                // Xóa search cũ
                currentSearch = "";


                const searchInput =
                    getSearchInput();


                if (searchInput) {
                    searchInput.value = "";
                }


                applyFilters();


                // Scroll xuống material
                setTimeout(() => {

                    const container =
                        document.getElementById(
                            "materialsGrid"
                        );


                    if (container) {

                        container.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }, 100);

            }
        );

    });

}


// ======================================================
// 10. APPLY FILTERS
// ======================================================

function applyFilters() {

    let filtered = [
        ...allMaterials
    ];


    // ------------------------------------------
    // SUBJECT
    // ------------------------------------------

    if (currentSubject) {

        filtered =
            filtered.filter(
                material =>
                    normalize(
                        material.subject
                    ) ===
                    normalize(
                        currentSubject
                    )
            );

    }


    // ------------------------------------------
    // COURSE
    // ------------------------------------------

    if (currentCourse) {

        filtered =
            filtered.filter(
                material =>
                    normalize(
                        material.course
                    ) ===
                    normalize(
                        currentCourse
                    )
            );

    }


    // ------------------------------------------
    // SEARCH
    // ------------------------------------------

    if (currentSearch) {

        filtered =
            filtered.filter(
                material => {

                    const searchable =
                        normalize(
                            [
                                material.title,
                                material.description,
                                material.subject,
                                material.course
                            ]
                            .filter(Boolean)
                            .join(" ")
                        );


                    return searchable.includes(
                        currentSearch
                    );

                }
            );

    }


    displayMaterials(
        filtered
    );

}


// ======================================================
// 11. SEARCH
// ======================================================

function getSearchInput() {

    return (
        document.getElementById(
            "materialSearch"
        )
        ||
        document.querySelector(
            'input[type="search"]'
        )
        ||
        document.querySelector(
            '.materials-search input'
        )
    );

}


function setupSearch() {

    const searchInput =
        getSearchInput();


    if (!searchInput) {

        console.log(
            "Material search input not found."
        );

        return;
    }


    searchInput.addEventListener(
        "input",
        () => {

            currentSearch =
                normalize(
                    searchInput.value
                );


            // Nếu user search trực tiếp
            // mà chưa chọn category,
            // search toàn bộ library.

            applyFilters();

        }
    );

}


// ======================================================
// 12. MATERIAL BUTTON
// ======================================================

function setupMaterialButtons() {

    const buttons =
        document.querySelectorAll(
            ".material-button"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            async () => {

                const materialId =
                    button.dataset.id;


                await openMaterial(
                    materialId
                );

            }
        );

    });

}


// ======================================================
// 13. OPEN MATERIAL
// ======================================================

async function openMaterial(materialId) {

    const { data, error } =
        await supabaseClient
            .from("Materials")
            .select(
                "id,title,file_path,price"
            )
            .eq(
                "id",
                materialId
            )
            .single();


    if (error) {

        console.error(
            "Unable to find material:",
            error
        );

        return;
    }


    if (!data?.file_path) {

        console.error(
            "This material has no file_path."
        );

        return;
    }


    // ------------------------------------------
    // CURRENT FILE ACCESS
    // ------------------------------------------

    const { data: urlData } =
        supabaseClient.storage
            .from("material-files")
            .getPublicUrl(
                data.file_path
            );


    if (!urlData?.publicUrl) {

        console.error(
            "Unable to create material URL."
        );

        return;
    }


    window.open(
        urlData.publicUrl,
        "_blank",
        "noopener,noreferrer"
    );

}


// ======================================================
// 14. NORMALIZE TEXT
// ======================================================

function normalize(value) {

    return String(
        value || ""
    )
        .trim()
        .toLowerCase();

}


// ======================================================
// 15. ESCAPE HTML
// ======================================================

function escapeHTML(value) {

    return String(
        value ?? ""
    )
        .replaceAll(
            "&",
            "&amp;"
        )
        .replaceAll(
            "<",
            "&lt;"
        )
        .replaceAll(
            ">",
            "&gt;"
        )
        .replaceAll(
            '"',
            "&quot;"
        )
        .replaceAll(
            "'",
            "&#039;"
        );

}


// ======================================================
// 16. START WEBSITE
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    loadMaterials
);