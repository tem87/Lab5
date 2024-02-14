function generateMatrices() {
    clearErrorMessage();
    createMatrix('The 1st Matrix', 'matrix1', document.getElementById('matrix1Rows').value, document.getElementById('matrix1Cols').value);
    createMatrix('The 2nd Matrix','matrix2', document.getElementById('matrix2Rows').value, document.getElementById('matrix2Cols').value);
}

const createMatrix = (title, containerId, rows, cols) => {
    let container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content
    let table = document.createElement('table');
    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            let input = document.createElement('input');
            input.type = 'number';
            input.value = Math.floor(Math.random() * 100); // Random value between 0 and 99
            td.appendChild(input);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
};
/*
const showResult = (title, containerId, rows, cols, dataArray) => {
    let container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content
    let table = document.createElement('table');

    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            let span = document.createElement('span');
            // Calculate the index in the dataArray based on current row and column
            let index = i * cols + j;
            if (index < dataArray.length) {
                span.innerHTML = dataArray[index];
            }
            td.appendChild(span);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
}; */

const showResult2D = (title, containerId, dataArray) => {
	// dataArray is a 2D array
	// complete this function based on the showResult function
    let container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content
    let table = document.createElement('table');
    //iterate rows
    for (let i = 0; i < dataArray.length; i++) {
        let tr = document.createElement('tr');
        //columns
        for (let j = 0; j < dataArray[i].length; j++) {
            let td = document.createElement('td');
            //let span = document.createElement('span');
            //span.innerHTML = dataArray[i][j];
            td.textContent = dataArray[i][j];
            //td.appendChild(span);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
}

function performOperation(operation) {
    let matrix1 = getMatrixData2D('matrix1');
    let matrix2 = getMatrixData2D('matrix2');
    console.log("1st Matrix",matrix1);
    console.log("2nd Matrix", matrix2);
    console.log("Operation", operation);
    // Just a test result
    let result;
    // Call your matrix calculation functions here
    // For example: if (operation === 'add') { addMatrices(matrix1, matrix2); }
	// prints suitable messages for impossible situation
    if(operation === 'add'){
        result = addMatrices(matrix1, matrix2);
    }else if(operation === 'subtract'){
        result = subtractMatrices(matrix1, matrix2);
    }
    else if(operation === 'multiply'){
        result = multiplyMatrices(matrix1, matrix2);
    }
    showResult2D('The Result', 'matrix3', result);
}

const displayErrorMessage = (errorMessage) => {
    let errorContainer = document.getElementById('errorContainer');
    if (!errorContainer) {
        errorContainer = document.createElement('div');
        errorContainer.id = 'errorContainer';
        document.body.appendChild(errorContainer);
    }
    errorContainer.textContent = errorMessage;
};

const clearErrorMessage = () => {
    let errorContainer = document.getElementById('errorContainer');
    if (errorContainer) {
        errorContainer.innerHTML = '';
    }
};


const getMatrixData1D = function (matrixId) {
    let matrixData = [];
    let inputs = document.querySelectorAll(`#${matrixId} input`);
    inputs.forEach(input => {
        matrixData.push(parseInt(input.value, 10));
    });
    return matrixData;
};

const getMatrixData2D = function (matrixId) {
    let matrixData = [];
    let rows = parseInt(document.getElementById(matrixId + 'Rows').value, 10);
    let cols = parseInt(document.getElementById(matrixId + 'Cols').value, 10);
    let inputs = document.querySelectorAll(`#${matrixId} input`);

    for (let i = 0; i < rows; i++) {
        let rowData = [];
        for (let j = 0; j < cols; j++) {
            // Calculate index in the flat list of inputs
            let index = i * cols + j;
            if (index < inputs.length) {
                rowData.push(parseInt(inputs[index].value, 10));
            } else {
                rowData.push(0); // Default value if input is missing
            }
        }
        matrixData.push(rowData);
    }
    return matrixData;
};


// Add your matrix calculation functions here
// The functions must check the posibility of calculation too.
function addMatrices(matrix1, matrix2){ 
	// provide the code
    let addedMatrix = [];

    if(matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length){
        let errorMessage = "ERROR. Matrices must have the same dimensions to be added. Try again :)";
        displayErrorMessage(errorMessage);
        //console.error("ERROR. Matrices mush have the same dimensions to be added. Try again :)");
        //setTimeout(clearErrorMessage, 3000);
        return;
    }

    //first loop fro the rows
    for(let i = 0; i < matrix1.length; i++){
        let row = [];
        //second loop for the columns
        for(let j = 0; j < matrix1[0].length; j++){
            row.push(matrix1[i][j] + matrix2[i][j]);
        }
        addedMatrix.push(row);
    }
    return addedMatrix;
}
const subtractMatrices = function (matrix1, matrix2) { 
    let subtractedMatrix = [];

    if(matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length){
        let errorMessage = "ERROR. Matrices must have the same dimensions to be added. Try again :)";
        displayErrorMessage(errorMessage);
        //console.log("ERROR. Matrices mush have the same dimensions to be subtracted. Try again :)");
        //setTimeout(clearErrorMessage, 3000);
        return;
    }

    //first loop fro the rows
    for(let i = 0; i < matrix1.length; i++){
        let row = [];
        //second loop for the columns
        for(let j = 0; j < matrix1[0].length; j++){
            row.push(matrix1[i][j] - matrix2[i][j]);
        }
        subtractedMatrix.push(row);
    }
    return subtractedMatrix;
};
const multiplyMatrices = (matrix1, matrix2) => { 
    let multMatrix = [];

    if(matrix1[0].length !== matrix2.length){
        let errorMessage = "ERROR. Try again :)";
        displayErrorMessage(errorMessage);
        //setTimeout(clearErrorMessage, 3000);
        //console.log("Can't make the operation. Try again :)");
        return;
    }

    //first loop fro the rows
    for(let i = 0; i < matrix1.length; i++){
        let row = [];
        //second loop for the columns
        for(let j = 0; j < matrix1[0].length ; j++){
            let add = 0;
            //multiply the row by the column
            //index can be the number of columns in the first matrix or the number of rows in the second matrix
            for(let index = 0; index < matrix1[0].length; index++){
                add += matrix1[i][index] * matrix2[index][j];
            }
            row.push(add);
        }
        multMatrix.push(row);
    }
    return multMatrix;
};
