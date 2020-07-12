export interface model_alquiler{
    desc_alqu?:string;
    estado_alqu?:string;
    fec_fin_alqu?:string;
    fec_ini_alqu?:string;
    fec_registr_alquiler?:string;
    fec_registr_reserva?:string;
    id_alqu?:string;
    id_cli?:string;
    id_detusu?:string;
    id_tipopago?:string;
    id_vehi?:string;
    pago_alqu?:string;
    ticket_alquiler?:string;
    tipo_alqu?:string;
}

export interface model_registrar_alquiler{
    id_vehi?:string;
    id_cli?:string;
    id_tipopago?:string;
    fec_ini_alqu?:string;
    fec_fin_alqu?:string;
    desc_alqu?:string;
    tipo_alqu?:string;
    estado_alqu?:string;
    pago_alqu?:string;
    id_conduc?:string;
}


export interface model_act_est_alqu{
    estado_alqu?:string;
}