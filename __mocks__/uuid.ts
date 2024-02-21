const UUID = jest.genMockFromModule('uuid') as { v4: VoidFunction };

const mockedV4Value = 'uuid/v4';

UUID.v4 = jest.fn(() => mockedV4Value);

module.exports = UUID;
module.exports.mockedV4Value = mockedV4Value;
