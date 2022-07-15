package main

import (
	"fmt"
	"test/js"
	"test/util/aes"
)

func main() {
	test2()
}

func test2() {
	var en = js.GetEncrypt()
	var de = js.GetDecrypt()

	var str1 = en("hello")
	fmt.Println(str1)
	fmt.Println(de(str1))

	var a = aes.AesEcpt
	var a1, _ = a.AesBase64Encrypt("hello")
	fmt.Println(a1)
	var a2, _ = a.AesBase64Decrypt(a1)
	fmt.Println(a2)

}
