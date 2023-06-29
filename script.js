// first reqest to server to create order

const paymentStart = () => {
	console.log("Payment Started");
	let amount = $("#payment_field").val();
	console.log(amount);
	if (amount == "" || amount == null) {
		alert("Amount is required!!");
		return;
	}

	// code
	// we will use ajax to send request to server to create order

	$.ajax(
		{
			url: "/create_order",
			data: JSON.stringify({ amount: amount, info: "order_request" }),
			contentType: "application/json",
			type: "POST",
			dataType: "json",
			success: function(response) {
				// invode razorpay
				console.log(response);
				if (response.status == "created") {
					// open payment form
					let options = {
						key: "rzp_test_4Q9Z4gFWd7z4y1",
						amount: response.amt,
						"currency": "INR",
						"name": "sanyam-test",
						"description": "Test ",
						"image": "https://example.com/your_logo",
						"order_id": response.id,
						handler: function(response) {
							console.log(response.razorpay_payment_id)
							console.log(response.razorpay_order_id)
							console.log(response.razorpay_signature)
							console.log("payment done")
							alert("payment done")
						},
						"prefill": {
							"name": "sanyam",
							"email": "sanyam@example.com",
							"contact": "9999999999"
						},
						"notes": {
							"address": "test"

						},
						"theme": {
							"color": "#3399cc"
						}
					};
					var rzp1 = new Razorpay(options);
					rzp1.on('payment.failed', function(response) {
						alert(response.error.code);
						alert(response.error.description);
						alert(response.error.source);
						alert(response.error.step);
						alert(response.error.reason);
						alert(response.error.metadata.order_id);
						alert(response.error.metadata.payment_id);
					});

					rzp1.open();

				}
			},
			error: function(error) {
				console.log(error);
				alert("Something went wrong!!");
			},
		});
};
