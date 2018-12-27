describe('@$Apply', () => {
	beforeEach(done => {
		setTimeout(() => {
			require('./$Apply').$Apply;
			done();
		});
	});
});
