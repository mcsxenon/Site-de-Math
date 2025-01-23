document.addEventListener("DOMContentLoaded", () => {
    const pdfButtons = document.querySelectorAll(".show-pdf");

    pdfButtons.forEach(button => {
        button.addEventListener("click", () => {
            const targetId = button.getAttribute("data-target");
            const pdfViewer = document.getElementById(targetId);

            if (pdfViewer) {
                const isVisible = pdfViewer.style.display === "block";
                pdfViewer.style.display = isVisible ? "none" : "block";
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const equationContainer = document.getElementById("equation");
    const solutionContainer = document.getElementById("solution");
    const newEquationButton = document.getElementById("new-equation");
    const showSolutionButton = document.getElementById("show-solution");

    let currentEquation = "";
    let currentSolution = "";

    const generateEquation = () => {
        const functionTypes = [
            () => {
                // Polynôme du 2ème ou 3ème degré
                const degree = Math.floor(Math.random() * 2) + 2; // 2 ou 3
                let equation = "";
                let solution = "";
                for (let i = degree; i >= 0; i--) {
                    const coefficient = Math.floor(Math.random() * 10) - 5; // Coefficients entre -5 et 5
                    if (coefficient !== 0) {
                        equation += `${coefficient > 0 && i < degree ? "+" : ""}${coefficient}${i > 0 ? "x^" + i : ""} `;
                        if (i > 0) {
                            solution += `${coefficient * i > 0 && i < degree ? "+" : ""}${coefficient * i}${i > 1 ? "x^" + (i - 1) : ""} `;
                        }
                    }
                }
                currentEquation = equation.trim();
                currentSolution = solution.trim();
            },
            () => {
                // Fonction rationnelle : a/(bx + c)
                const a = Math.floor(Math.random() * 10) + 1;
                const b = Math.floor(Math.random() * 10) + 1;
                const c = Math.floor(Math.random() * 10) - 5;
                currentEquation = `\\frac{${a}}{${b}x + ${c}}`;
                currentSolution = `\\frac{-${a * b}}{(${b}x + ${c})^2}`;
            },
            () => {
                // Fonction avec racines carrées : a * sqrt(bx + c)
                const a = Math.floor(Math.random() * 10) + 1;
                const b = Math.floor(Math.random() * 10) + 1;
                const c = Math.floor(Math.random() * 10) - 5;
                currentEquation = `${a}\\sqrt{${b}x + ${c}}`;
                currentSolution = `\\frac{${a * b}}{2\\sqrt{${b}x + ${c}}}`;
            },
            () => {
                // Fonction trigonométrique complexe : a sin(bx) ou a cos(bx)
                const a = Math.floor(Math.random() * 10) + 1;
                const b = Math.floor(Math.random() * 5) + 1;
                const trig = Math.random() < 0.5 ? "sin" : "cos";
                const derivative = trig === "sin" ? `${a * b}\\cos(${b}x)` : `-${a * b}\\sin(${b}x)`;
                currentEquation = `${a}\\${trig}(${b}x)`;
                currentSolution = derivative;
            }
        ];

        // Choisir une fonction aléatoire
        const randomFunction = functionTypes[Math.floor(Math.random() * functionTypes.length)];
        randomFunction();

        // Afficher l'équation
        equationContainer.innerHTML = `f(x) = \\(${currentEquation}\\)`;
        solutionContainer.textContent = "";
        showSolutionButton.disabled = false;
        MathJax.typeset(); // Rendu LaTeX
    };

    newEquationButton.addEventListener("click", () => {
        generateEquation();
    });

    showSolutionButton.addEventListener("click", () => {
        solutionContainer.innerHTML = `f'(x) = \\(${currentSolution}\\)`;
        showSolutionButton.disabled = true;
        MathJax.typeset(); // Rendu LaTeX
    });
});
