export const returnTransfers = () => {
  const transfers = `from_stop_id,to_stop_id,transfer_type,min_transfer_time
    101,101,2,180
    103,103,2,180
    104,104,2,180
    106,106,2,180
    107,107,2,180
    108,108,2,180
    109,109,2,180
    110,110,2,180
    111,111,2,180
    112,112,2,180
    112,A09,2,180
    113,113,2,180
    114,114,2,180
    115,115,2,180
    116,116,2,180
    117,117,2,180
    118,118,2,180
    119,119,2,180
    120,120,2,180
    121,121,2,180
    122,122,2,180
    123,123,2,0
    124,124,2,180
    125,125,2,180
    125,A24,2,180
    126,126,2,180
    127,127,2,0
    127,725,2,180
    127,902,2,180
    127,A27,2,300
    127,R16,2,180
    128,128,2,300
    129,129,2,180
    130,130,2,180
    131,131,2,180
    132,132,2,0
    132,D19,2,300
    132,L02,2,180
    133,133,2,180
    134,134,2,180
    135,135,2,180
    136,136,2,180
    137,137,2,180
    138,138,2,180
    139,139,2,180
    140,140,2,180
    140,R27,2,120
    201,201,2,180
    204,204,2,180
    205,205,2,180
    206,206,2,180
    207,207,2,180
    208,208,2,180
    209,209,2,180
    210,210,2,180
    211,211,2,180
    212,212,2,180
    213,213,2,180
    214,214,2,180
    215,215,2,180
    216,216,2,180
    217,217,2,180
    218,218,2,180
    219,219,2,180
    220,220,2,180
    221,221,2,180
    222,222,2,180
    222,415,2,180
    227,227,2,0
    228,228,2,180
    228,A36,2,180
    228,E01,2,180
    229,229,2,180
    229,418,2,300
    229,A38,2,180
    229,M22,2,300
    230,230,2,180
    231,231,2,180
    232,232,2,180
    232,423,2,300
    232,R28,2,180
    233,233,2,180
    234,234,2,0
    235,235,2,300
    235,D24,2,180
    235,R31,2,180
    236,236,2,180
    237,237,2,180
    238,238,2,180
    239,239,2,0
    239,S04,2,180
    241,241,2,180
    242,242,2,180
    243,243,2,180
    244,244,2,180
    245,245,2,180
    246,246,2,180
    247,247,2,180
    248,248,2,180
    249,249,2,180
    250,250,2,0
    251,251,2,180
    252,252,2,180
    253,253,2,180
    254,254,2,180
    254,L26,2,300
    255,255,2,180
    256,256,2,180
    257,257,2,180
    301,301,2,180
    302,302,2,180
    401,401,2,180
    402,402,2,180
    405,405,2,180
    406,406,2,180
    407,407,2,180
    408,408,2,180
    409,409,2,0
    410,410,2,180
    411,411,2,180
    412,412,2,180
    413,413,2,180
    414,414,2,180
    414,D11,2,180
    415,222,2,180
    415,415,2,0
    416,416,2,180
    418,229,2,300
    418,418,2,180
    418,A38,2,180
    418,M22,2,300
    419,419,2,180
    420,420,2,180
    423,232,2,300
    423,423,2,180
    423,R28,2,180
    501,501,2,180
    502,502,2,180
    503,503,2,180
    504,504,2,180
    505,505,2,180
    601,601,2,180
    602,602,2,180
    603,603,2,180
    604,604,2,180
    606,606,2,180
    607,607,2,180
    608,608,2,0
    609,609,2,180
    610,610,2,180
    611,611,2,180
    612,612,2,180
    613,613,2,0
    614,614,2,180
    615,615,2,180
    616,616,2,180
    617,617,2,180
    618,618,2,180
    619,619,2,0
    621,621,2,180
    622,622,2,180
    623,623,2,180
    624,624,2,180
    625,625,2,180
    626,626,2,180
    627,627,2,180
    628,628,2,180
    629,629,2,180
    629,B08,2,300
    629,R11,2,180
    630,630,2,180
    630,F11,2,180
    631,631,2,0
    631,723,2,180
    631,901,2,180
    632,632,2,180
    633,633,2,180
    634,634,2,180
    635,635,2,0
    635,L03,2,180
    635,R20,2,180
    636,636,2,180
    637,637,2,180
    637,D21,2,180
    638,638,2,180
    639,639,2,180
    639,M20,2,180
    639,Q01,2,180
    639,R23,2,180
    640,640,2,0
    640,M21,2,180
    701,701,2,180
    702,702,2,180
    705,705,2,180
    706,706,2,180
    707,707,2,0
    708,708,2,180
    709,709,2,180
    710,710,2,180
    710,G14,2,180
    711,711,2,180
    712,712,2,0
    713,713,2,180
    714,714,2,180
    715,715,2,180
    716,716,2,180
    718,718,2,0
    718,R09,2,0
    719,719,2,180
    719,F09,2,300
    719,G22,2,180
    720,720,2,180
    721,721,2,180
    723,631,2,180
    723,723,2,180
    723,901,2,300
    724,724,2,180
    724,D16,2,180
    725,127,2,180
    725,725,2,180
    725,902,2,300
    725,A27,2,180
    725,R16,2,180
    901,631,2,180
    901,723,2,300
    901,901,2,180
    902,127,2,180
    902,725,2,300
    902,902,2,180
    902,A27,2,300
    902,R16,2,180
    A02,A02,2,180
    A03,A03,2,180
    A05,A05,2,180
    A06,A06,2,180
    A07,A07,2,180
    A09,112,2,180
    A09,A09,2,0
    A10,A10,2,180
    A11,A11,2,180
    A12,A12,2,0
    A12,D13,2,180
    A14,A14,2,180
    A15,A15,2,0
    A16,A16,2,180
    A17,A17,2,180
    A18,A18,2,180
    A19,A19,2,180
    A20,A20,2,180
    A21,A21,2,180
    A22,A22,2,180
    A24,125,2,180
    A24,A24,2,0
    A25,A25,2,180
    A27,127,2,300
    A27,725,2,180
    A27,902,2,300
    A27,A27,2,0
    A27,R16,2,300
    A28,A28,2,300
    A30,A30,2,180
    A31,A31,2,0
    A31,L01,2,90
    A32,A32,2,0
    A32,D20,2,180
    A33,A33,2,180
    A34,A34,2,0
    A36,228,2,180
    A36,A36,2,180
    A36,E01,2,300
    A38,229,2,180
    A38,418,2,180
    A38,A38,2,180
    A38,M22,2,180
    A40,A40,2,180
    A41,A41,2,180
    A41,R29,2,90
    A42,A42,2,180
    A43,A43,2,180
    A44,A44,2,180
    A45,A45,2,180
    A45,S01,2,180
    A46,A46,2,180
    A47,A47,2,180
    A48,A48,2,0
    A49,A49,2,180
    A50,A50,2,180
    A51,A51,2,0
    A51,J27,2,180
    A51,L22,2,180
    A52,A52,2,180
    A53,A53,2,180
    A54,A54,2,180
    A55,A55,2,0
    A57,A57,2,180
    A59,A59,2,180
    A60,A60,2,180
    A61,A61,2,180
    A63,A63,2,180
    A64,A64,2,180
    A65,A65,2,180
    B04,B04,2,180
    B06,B06,2,180
    B08,629,2,300
    B08,B08,2,180
    B08,R11,2,300
    B10,B10,2,180
    B12,B12,2,180
    B13,B13,2,180
    B14,B14,2,180
    B15,B15,2,180
    B16,B16,2,180
    B16,N04,2,180
    B17,B17,2,180
    B18,B18,2,180
    B19,B19,2,180
    B20,B20,2,180
    B21,B21,2,180
    B22,B22,2,180
    B23,B23,2,180
    D01,D01,2,180
    D03,D03,2,0
    D04,D04,2,0
    D05,D05,2,0
    D06,D06,2,180
    D07,D07,2,0
    D08,D08,2,180
    D09,D09,2,180
    D10,D10,2,180
    D11,414,2,180
    D11,D11,2,180
    D12,D12,2,180
    D13,A12,2,180
    D13,D13,2,0
    D14,D14,2,180
    D15,D15,2,300
    D16,724,2,180
    D16,D16,2,0
    D17,D17,2,0
    D17,R17,2,180
    D18,D18,2,180
    D19,132,2,300
    D19,D19,2,180
    D19,L02,2,180
    D20,A32,2,180
    D20,D20,2,0
    D21,637,2,180
    D21,D21,2,0
    D22,D22,2,180
    D24,235,2,180
    D24,D24,2,180
    D24,R31,2,300
    D25,D25,2,180
    D26,D26,2,180
    D27,D27,2,180
    D28,D28,2,0
    D29,D29,2,180
    D30,D30,2,180
    D31,D31,2,0
    D32,D32,2,180
    D33,D33,2,180
    D34,D34,2,180
    D35,D35,2,0
    D37,D37,2,180
    D38,D38,2,180
    D39,D39,2,0
    D40,D40,2,300
    D41,D41,2,180
    D42,D42,2,180
    D43,D43,2,180
    E01,228,2,180
    E01,A36,2,300
    E01,E01,2,180
    F01,F01,2,180
    F02,F02,2,180
    F03,F03,2,180
    F04,F04,2,180
    F06,F06,2,0
    F07,F07,2,180
    F09,719,2,300
    F09,F09,2,180
    F09,G22,2,180
    F11,630,2,180
    F11,F11,2,180
    F12,F12,2,180
    F14,F14,2,300
    F15,F15,2,180
    F15,M18,2,180
    F16,F16,2,180
    F18,F18,2,180
    F21,F21,2,180
    F22,F22,2,180
    F23,F23,2,180
    F23,R33,2,180
    F24,F24,2,0
    F25,F25,2,180
    F26,F26,2,180
    F27,F27,2,0
    F29,F29,2,180
    F30,F30,2,180
    F31,F31,2,180
    F32,F32,2,180
    F33,F33,2,180
    F34,F34,2,180
    F35,F35,2,180
    F36,F36,2,180
    F38,F38,2,180
    F39,F39,2,180
    G05,G05,2,180
    G06,G06,2,180
    G07,G07,2,180
    G08,G08,2,0
    G09,G09,2,180
    G10,G10,2,180
    G11,G11,2,180
    G12,G12,2,180
    G13,G13,2,180
    G14,710,2,180
    G14,G14,2,180
    G15,G15,2,180
    G16,G16,2,180
    G18,G18,2,180
    G19,G19,2,180
    G20,G20,2,180
    G21,G21,2,180
    G22,719,2,180
    G22,F09,2,180
    G22,G22,2,180
    G24,G24,2,180
    G26,G26,2,180
    G28,G28,2,180
    G29,G29,2,180
    G29,L10,2,180
    G30,G30,2,180
    G31,G31,2,180
    G32,G32,2,180
    G33,G33,2,180
    G34,G34,2,180
    G35,G35,2,180
    G36,G36,2,180
    H02,H02,2,180
    H03,H03,2,180
    H04,H04,2,180
    H06,H06,2,180
    H07,H07,2,180
    H08,H08,2,180
    H09,H09,2,180
    H10,H10,2,180
    H11,H11,2,180
    H12,H12,2,180
    H13,H13,2,180
    H14,H14,2,180
    H15,H15,2,180
    J12,J12,2,180
    J13,J13,2,180
    J14,J14,2,180
    J15,J15,2,180
    J16,J16,2,180
    J17,J17,2,180
    J19,J19,2,180
    J20,J20,2,180
    J21,J21,2,180
    J22,J22,2,180
    J23,J23,2,180
    J24,J24,2,180
    J27,A51,2,180
    J27,J27,2,0
    J27,L22,2,180
    J28,J28,2,180
    J29,J29,2,180
    J30,J30,2,180
    J31,J31,2,180
    L01,A31,2,90
    L01,L01,2,180
    L02,132,2,180
    L02,D19,2,180
    L02,L02,2,180
    L03,635,2,180
    L03,L03,2,180
    L03,R20,2,180
    L05,L05,2,180
    L06,L06,2,180
    L08,L08,2,180
    L10,G29,2,180
    L10,L10,2,180
    L11,L11,2,180
    L12,L12,2,180
    L13,L13,2,180
    L14,L14,2,180
    L15,L15,2,180
    L16,L16,2,180
    L17,L17,2,180
    L17,M08,2,180
    L19,L19,2,180
    L20,L20,2,180
    L21,L21,2,180
    L22,A51,2,180
    L22,J27,2,180
    L22,L22,2,180
    L24,L24,2,180
    L25,L25,2,180
    L26,254,2,300
    L26,L26,2,180
    L27,L27,2,180
    L28,L28,2,180
    L29,L29,2,180
    M01,M01,2,180
    M04,M04,2,180
    M05,M05,2,180
    M06,M06,2,180
    M08,L17,2,180
    M08,M08,2,180
    M09,M09,2,180
    M10,M10,2,180
    M11,M11,2,0
    M12,M12,2,180
    M13,M13,2,180
    M14,M14,2,180
    M16,M16,2,0
    M18,F15,2,180
    M18,M18,2,180
    M19,M19,2,180
    M20,639,2,180
    M20,M20,2,180
    M20,Q01,2,180
    M20,R23,2,300
    M21,640,2,180
    M21,M21,2,180
    M22,229,2,300
    M22,418,2,300
    M22,A38,2,180
    M22,M22,2,180
    M23,M23,2,180
    N02,N02,2,180
    N03,N03,2,180
    N04,B16,2,180
    N04,N04,2,180
    N05,N05,2,180
    N06,N06,2,180
    N07,N07,2,180
    N08,N08,2,180
    N09,N09,2,180
    N10,N10,2,180
    Q01,639,2,180
    Q01,M20,2,180
    Q01,Q01,2,180
    Q01,R23,2,180
    R01,R01,2,180
    R03,R03,2,0
    R04,R04,2,180
    R05,R05,2,180
    R06,R06,2,180
    R08,R08,2,180
    R09,718,2,0
    R09,R09,2,180
    R11,629,2,180
    R11,B08,2,300
    R11,R11,2,0
    R13,R13,2,180
    R14,R14,2,180
    R15,R15,2,180
    R16,127,2,180
    R16,725,2,180
    R16,902,2,180
    R16,A27,2,300
    R16,R16,2,0
    R17,D17,2,180
    R17,R17,2,0
    R18,R18,2,180
    R19,R19,2,180
    R20,635,2,180
    R20,L03,2,180
    R20,R20,2,0
    R21,R21,2,180
    R22,R22,2,180
    R23,639,2,180
    R23,M20,2,300
    R23,Q01,2,180
    R23,R23,2,180
    R24,R24,2,180
    R26,R26,2,180
    R27,R27,2,180
    R27,140,2,120
    R28,232,2,180
    R28,423,2,180
    R28,R28,2,180
    R29,R29,2,180
    R29,A41,2,90
    R30,R30,2,180
    R31,235,2,180
    R31,D24,2,300
    R31,R31,2,0
    R32,R32,2,180
    R33,F23,2,180
    R33,R33,2,180
    R34,R34,2,180
    R35,R35,2,180
    R36,R36,2,0
    R39,R39,2,180
    R40,R40,2,180
    R41,R41,2,0
    R42,R42,2,180
    R43,R43,2,180
    R44,R44,2,180
    R45,R45,2,180
    S01,A45,2,180
    S01,S01,2,180
    S03,S03,2,180
    S04,239,2,180
    S04,S04,2,180`;
    return transfers;
  }
