import { motion } from 'framer-motion'

export default function LoveLetter() {
  return (
    <motion.div
      id="love-letter"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      style={{
        background: 'white',
        borderRadius: 'var(--radius)',
        padding: '52px 44px',
        boxShadow: 'var(--shadow)',
        border: '1px solid var(--color-pink-light)',
        width: '100%',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div style={{ fontSize: '2rem' }}>💌</div>
      </div>

      <div style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '1.05rem',
        lineHeight: 1.9,
        color: 'var(--color-text)',
      }}>
        <p style={{ marginBottom: '20px' }}>
          Hey sayang, I hope you always do well in your life. I know mungkin sekarang
          kamu berada di fase baru hidupmu — semua serba baru, serba cepat sekali berubah,
          serba tidak yakin, dan lainnya. Aku gamau ngulang semua lecture ku setiap hari
          yang aku kasih ke kamu, bekal tumbuh pun ga cuma dari aku saja. Tapi aku ingin
          kamu tahu satu hal. Di setiap fase baru itu, kamu ga harus selalu kuat sendirian.
          Kamu boleh bingung, boleh takut, boleh merasa ga siap, boleh berhenti sebentar
          buat tarik nafas. Namanya juga idup — kalo ga cepet berubah ya gada tantangan
          toh wkwk.
        </p>
        <p style={{ marginBottom: '20px' }}>
          Kedepannya mungkin kalo aku ga ada di dekatmu, atau aku udah ga ada sama sekali
          di setiap hari, jam, menit, dan detik yang kamu lewatin — sudah gabisa jawabin
          semua kekepoanmu lagi, dan gabisa buat semuanya lebih mudah lagi — aku cuma mau
          kamu tau aku bener bener bahagia setiap saatnya sama kamu. Walau aku yang sering
          bete karena panas, sering bete karena masalahku, dan sering buat kamu sebel juga.
          Aku sayang banget sama kamu, Selvi Rebecca.
        </p>
        <p style={{ marginBottom: '20px' }}>
          Next kedepannya, jangan terlalu keras sama kamu sendiri. Small steps matters
          kok — pion pun berjalan dengan langkah kecil dan dia bisa berubah jadi hal hal
          hebat yang dia inginkan tohh. Aku bakal selalu inget hal hal yang kita lakuin,
          dari mulai di TTL, makan bareng tiap pagi, ngobrol-ngobrol kecil yang bakal kita
          lupain jam berikutnya, topic yang gapernah abis, dan semua hal yang selalu kita
          lakukan bareng hehehe. Terus dilanjut ketika abis nganter Ditta balik xixi. Our
          first kiss and very much all the lovey dovey things that we have done.
        </p>
        <p style={{ marginBottom: '20px' }}>
          Terus serius deh, aku bangga bangett sama kamu sayangg — mulai dari small things
          yang orang gasadar, kalo that small gestures means a bit to them but a lot to you,
          dan all your big achievement yang kamu dapet dan bikin semua orang bangga sama
          kamu. Aku juga ikut seneng with all your love towards kids yang kamu selalu
          banggain di AM, your big heart — walau sekarang aku sering ngerasa kamu sudah
          mengurangi cintamu padaku karena masalahku HUH tai wkwk.
        </p>
        <p style={{ marginBottom: '20px' }}>
          Yah, kita LDR deh. Cepi gabisa nangis dipundak Biu agiii hihi. Walau berat
          nantinya kedepan, aku berharap kamu selalu punya punggung yang kuat, punya hati
          yang besar kalo ada masalah di hidupmu nanti, dan semua hal yang bikin kamu sedih
          nanti yang aku gabisa temenin secara langsung. Aku support kamu dari jauhhh, dan
          selalu support kamu selamanyaaaa.
        </p>
        <p style={{ marginBottom: '20px' }}>
          Nulis apa lagi ya, keknya udah banyak dah wkwk. Aku cuma berharap kedepannya kita
          punya masa depan yang cerah aja sih wkwk — dari hubungan personal dll.
        </p>
        <p style={{ marginBottom: '20px' }}>
          Dah ah, udah bingung mau nulis apa lagiii wkwk.
        </p>
        <p style={{ marginBottom: '24px', fontWeight: 700, color: 'var(--color-primary-dark)' }}>
          I LOVE YOU SAYANGGGGGGGGGGGGGGGGGG
        </p>
        <p>
          With all my love,<br />
          <span style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: '1.2rem',
            color: 'var(--color-primary)',
          }}>
            Biu 🌸
          </span>
        </p>
      </div>

      {/* ============================================================ */}

      <div style={{ textAlign: 'center', marginTop: '48px', fontSize: '1.5rem', letterSpacing: '8px', opacity: 0.4 }}>
        🌸 ✦ 🌸
      </div>
    </motion.div>
  )
}
