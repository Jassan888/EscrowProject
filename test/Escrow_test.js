const Escrow = artifacts.require('Escrow');

const assertError= async(promise,error)=>{
    try{
     await promise;  
    }catch(e){
        assert(e.message.includes(error))
        return;
    }
    assert(false);
}

contract('Escrow', accounts =>{
    let escrow= null;
    const [lawyer,payer, recipient]= accounts;
     before(async()=>{
         escrow= await Escrow.deployed();
     });

it('Should deposit', async()=>{
    await escrow.deposit({from:payer, value: 900})
    const escrowBalance= parseInt(await web3.eth.getBalance(
        escrow.address));
        assert(escrowBalance=== 900);
    });

    it('SHould not deposit if the sender is not the payer', async()=>{
        assertError(
            escrow.deposit({from:accounts[5], value: 100}),
            'Sender must be payer'
        );
    });

    it('Should not deposit if transfer exceds amount', async()=>{
        assertError(
            escrow.deposit({from:payer, value:})
        )
    })
});