describe('@$Apply', () => {
	beforeEach(done => {
		setTimeout(() => {
			require('./$Apply').default;
			done();
		});
	});
});
