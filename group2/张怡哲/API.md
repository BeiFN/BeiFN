toDateString();                                              以美式英语和人类易读的形式返回一个日期对象，日期部分的字符串；    
                                                            语法：  dateObj.toDateString();

toLocaleDateString([locales [,options]]);                   返回该日期对象日期部分的字符串，该字符串格式因不同语言而不同。
                                                            可通过参数 locales 和 options 使程序能够指定使用哪种语言格式化规则
                                                            语法：dateObj.toLocaleDateString([locales [, options]])

valueOf();                                                  方法返回以数值格式表示的一个 Date 对象的原始值，从1970年1月1日0时0分0秒（UTC，即协调世界时）到该日期对象所代表时间的                                                             毫秒数。
                                                            语法：dateObj.valueOf()

toISOString();                                               方法返回一个 ISO格式的字符串： YYYY-MM-DDTHH:mm:ss.sssZ。时区总是UTC（协调世界时），加一个后缀“Z”标识。
                                                            语法：dateObj.toISOString()

toJSON();                                                   Date 实例引用一个具体的时间点。 调用 toJSON() 返回一个 JSON 格式字符串(使用 toISOString())，表示该日期对象的值。默                                                             认情况下，这个方法常用于 JSON序列化Date对象。
                                                            语法：dateObj.toJSON()