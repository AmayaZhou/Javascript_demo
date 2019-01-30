// listen for submit  为什么给form添加submit事件，而不是给button添加？
document.getElementById('loan-form').addEventListener('submit', function(e){
    // hide results page. 重新点计算，result会显示，所以要确保results一直隐藏
    document.querySelector('#results').style.display = 'none';
    // show loading img and disappear after 2s
    document.querySelector('#loading').style.display = 'block';
    setTimeout(calculateResults, 1000);
    e.preventDefault();
});

function calculateResults(e){
    console.log('calculating');
    // UI vars
    const ELamount = document.getElementById('amount');
    const ELinterest = document.getElementById('interest');
    const ELyears = document.getElementById('years');
    const ELmonthlyPayment = document.getElementById('monthly-payment');
    const ELtotalPayment = document.getElementById('total-payment');
    const ELtotalInterest = document.getElementById('total-interest');

    const principle = parseFloat(amount.value);  // 贷款额
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;  //月利率
    const calculatedPayments = parseFloat(years.value) * 12;  // 年数x12?

    // compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);  //Math.pow(double a, double b)
    //是求a的b次方的
    const monthly =  (principle*x*calculatedInterest)/(x-1);  // 每月还款额

    if(isFinite(monthly)){
        ELmonthlyPayment.value = monthly.toFixed(2); // toFixed() 方法可把 Number 四舍五入为指定小数位数的数字
        ELtotalPayment.value = (monthly * calculatedPayments).toFixed(2);
        ELtotalInterest.value = (monthly * calculatedPayments - principle).toFixed(2);

        // hide loading img
        document.querySelector('#loading').style.display = 'none';
        // show results
        document.querySelector('#results').style.display = 'block';
    } else{
        //console.log('Please check your no'); 
        errorMsg('Please check your numbers');
    }

    
}

function errorMsg(error){
    // hide loading img
    document.querySelector('#loading').style.display = 'none';
    // hide results
    document.querySelector('#results').style.display = 'none';
    // create a div
    const errorDiv = document.createElement('div');
    // add class
    errorDiv.className = 'alert alert-danger';
    // create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // parent.insertBefore(new item, existing item)
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    card.insertBefore(errorDiv, heading);

    // clear error message after 3s
    setTimeout(clearError, 3000);
}

// 定义clearError function
function clearError(){
    document.querySelector('.alert').remove();
}