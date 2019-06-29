if (bool ? /^\d+$/.test(value) : ! /^\d+$/.test(value)) {
    console.log(success);
} else {
    console.log(error);
}