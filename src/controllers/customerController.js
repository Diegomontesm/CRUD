//USAR UN OBJE
const controller = {};

controller.list = (req,res) => {
    req.getConnection((err,conn)=>{
        conn.query('SELECT * FROM Customer', (err, customers)=>{
            if(err){
                res.json(err);
            }
            res.render('customers', {
                data: customers
            });
        });
    });

};

controller.save =(req, res) =>{
    const data = req.body;
    req.getConnection((err,conn)=>{
        conn.query('INSERT INTO Customer SET ?', [data],(err,customer)=>{
            console.log(customer);
            res.send('/');
        });
    })
}

controller.delete =(req, res) =>{
    const id = req.params.id;
    req.getConnection(err,conn => {
        console.query('DELETE FROM customer WHERE id=?', [id], (err,rows) => {
            res.send('/');
        });
    })
};

controller.edit = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
      conn.query("SELECT * FROM customer WHERE id = ?", [id], (err, rows) => {
        res.render('customers_edit', { 
          data: customer[0]
        })
      });
    });
  };

  controller.update = (req, res) => { //LOS DATOS QUE SE ESTAN ACTUALIZANDO EN EL FORMULARIO
    const { id } = req.params;
    const newCustomer = req.body;
    req.getConnection((err, conn) => {
  
    conn.query('UPDATE customer set ? where id = ?', [newCustomer, id], (err, rows) => {
      res.redirect('/');
    });
    });
  };

module.exports = controller;
